import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

// Define interfaces for type safety
interface ClaudeRequest {
  model: string;
  max_tokens: number;
  system: string;
  messages: { role: string; content: string }[];
}

interface ClaudeResponse {
  content: { text: string; type: string }[];
  id: string;
  model: string;
  type: string;
}

interface RequestBody {
  prompt: string;
}

interface ColorTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

// Initialize the Secrets Manager client
const secretsManager = new SecretsManagerClient({ region: process.env.AWS_REGION });
const secretName = 'claude-api-secret';

/**
 * Retrieves the Claude API key from Secrets Manager
 */
async function getClaudeApiKey(): Promise<string> {
  try {
    const command = new GetSecretValueCommand({ SecretId: secretName });
    const response = await secretsManager.send(command);
    
    if (response.SecretString) {
      const secret = JSON.parse(response.SecretString);
      return secret.key;
    }
    
    throw new Error('Could not retrieve Claude API key from Secrets Manager');
  } catch (error) {
    console.error('Error retrieving secret:', error);
    throw new Error('Failed to retrieve Claude API key');
  }
}

/**
 * Lambda handler function
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Set CORS headers for browser requests
  const headers = {
    'Access-Control-Allow-Origin': '*', // Update with your domain in production
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };
  
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }
  
  // Verify the request is POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }
  
  // Parse the incoming request body
  let requestBody: RequestBody;
  try {
    requestBody = event.body ? JSON.parse(event.body) : { prompt: '' };
  } catch (error) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid request body' })
    };
  }
  
  // Validate the prompt
  const { prompt } = requestBody;
  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Prompt is required' })
    };
  }
  
  // Get Claude API key at runtime
  let claudeApiKey: string;
  try {
    claudeApiKey = await getClaudeApiKey();
  } catch (error) {
    console.error('Failed to retrieve API key:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error', details: 'Could not retrieve API credentials' })
    };
  }
  
  // Call Claude API
  try {
    const claudeRequest: ClaudeRequest = {
      model: "claude-3-7-sonnet-20250219",
      max_tokens: 1000,
      system: `You are a color theme API for a web design tool. You MUST ONLY respond with a valid JSON object containing color values.

Your entire response must be a parseable JSON object with no additional text.
Do not include any explanatory text, markdown, code blocks, or formatting.
Do not use triple backticks, do not label the response as JSON.

description is a brief description of the theme including things like inspiration. background is the background color of the page. primary is the color used for main ui elements like buttons. secondary is used sparingly for some ui elements like tabs. accent is used just for things like occasional icons.

background colors are usually pale. primary and secondary are not too bright and can complement each other. accent can be bright.

The JSON structure is an JSON array that must follow exactly this format:
[
  {
    "description": "A brief description of the theme, including the colors used.",
    "primary": "#RRGGBB",
    "secondary": "#RRGGBB",
    "accent": "#RRGGBB",
    "background": "#RRGGBB",
  }
]

the array length is variable, but should be between 1 and 5 elements, each with a different theme idea.

Based on the user's input, generate appropriate, visually pleasing colors that work well together as a theme.

IMPORTANT: Your entire response must be ONLY the JSON object. No introduction, no explanation, no confirmation.`,
      messages: [
        { role: "user", content: prompt }
      ]
    };

    const response = await axios.post<ClaudeResponse>(
      'https://api.anthropic.com/v1/messages', 
      claudeRequest,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': claudeApiKey,
          'anthropic-version': '2023-06-01'
        }
      }
    );
    
    // Extract the content from Claude's response
    const content = response.data.content[0].text;
    
    // Try to parse the JSON
    try {
      // This validates that the response is proper JSON
      const themeData: ColorTheme = JSON.parse(content);
      
      // Return the successful response
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(themeData)
      };
    } catch (parseError) {
      // If Claude didn't return proper JSON, attempt to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const extractedJson: ColorTheme = JSON.parse(jsonMatch[0]);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(extractedJson)
        };
      } else {
        // If we can't extract JSON, return an error
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            error: "Failed to get valid JSON from Claude",
            rawResponse: content.substring(0, 200) + (content.length > 200 ? '...' : '')
          })
        };
      }
    }
  } catch (error: any) {
    console.error('Error calling Claude API:', error);
    
    // Return error details (be careful not to leak sensitive information)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: "Failed to generate color theme",
        details: error.response?.data?.error?.message || error.message
      })
    };
  }
};