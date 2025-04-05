import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Anthropic } from '@anthropic-ai/sdk';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

interface RequestBody {
  prompt: string;
}

// Claude API settings
const CLAUDE_SECRET_NAME = process.env.CLAUDE_SECRET_NAME || 'claude-api';
const CLAUDE_MODEL = process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20240620';
const CLAUDE_TEMPERATURE  = process.env.CLAUDE_TEMPERATURE || '0.8';
const CLAUDE_MAX_TOKENS = process.env.CLAUDE_MAX_TOKENS || '1000';

// Initialize Secrets Manager client
const secretsManager = new SecretsManagerClient({
  region: process.env.AWS_REGION || 'us-east-1'
});

// Log which model we're using for debugging
console.log('Using Claude model:', CLAUDE_MODEL);

/**
 * Lambda handler function
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Received event:', event);
  
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
  
  console.log('Prompt:', prompt);
  
  // Call Claude API
  try {
    // Prepare the system prompt for Claude API
    const systemPrompt = `Generate color themes as JSON only. Respond with an array of 6 theme objects:
[
  {
    "heading": "Theme Title", 
    "description": "Theme description. 2-3 sentences",
    "primary": "#RRGGBB",
    "secondary": "#RRGGBB",
    "accent": "#RRGGBB",
    "background": "#RRGGBB"
  }
]

Guidelines: Background should be light. Primary/secondary should be medium-darkness and complementary colors. Don't make primary and secondary colors look too similar. 

Accent should be distinct and eye-catching.

Based on the user's input, generate appropriate, visually pleasing colors that work well together as a theme.

IMPORTANT: Your entire response must be ONLY the JSON object. No introduction, no explanation, no confirmation.`;

    // Retrieve the API key from Secrets Manager
    let apiKey: string;
    try {
      const secretResponse = await secretsManager.send(
        new GetSecretValueCommand({
          SecretId: CLAUDE_SECRET_NAME
        })
      );
      
      if (!secretResponse.SecretString) {
        throw new Error('Secret value is empty');
      }
      
      const secretData = JSON.parse(secretResponse.SecretString);
      apiKey = secretData.key || secretData.CLAUDE_API_KEY;
      
      if (!apiKey) {
        throw new Error('API key not found in secret');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Error retrieving Claude API key from Secrets Manager:', errorMessage);
      throw new Error('Failed to retrieve API credentials');
    }
    
    // Initialize the Anthropic client with the API key
    const anthropic = new Anthropic({
      apiKey: apiKey
    });
    
    console.log('Calling Claude with Anthropic SDK...');
    
    // Create the message with the Anthropic SDK
    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: Number(CLAUDE_MAX_TOKENS),
      temperature: Number(CLAUDE_TEMPERATURE),
      system: systemPrompt,
      messages: [
        { 
          role: "user", 
          content: prompt
        }
      ]
    });
    
    console.log('Claude response:', JSON.stringify(response, null, 2));
    
    // Extract the content from Claude's response
    let content = '';
    
    if (response.content && response.content.length > 0) {
      // Combine all text content from the response
      content = response.content
        .filter(item => item.type === 'text')
        .map(item => item.text)
        .join('');
    } else {
      throw new Error('No content found in Claude response');
    }

    console.log('Extracted content:', content);
    
    // Parse the content as JSON
    try {
      // First, try to parse as is
      const themeData = JSON.parse(content);
      
      // Validate the structure before returning
      if (Array.isArray(themeData) && themeData.length > 0) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            themes: themeData
          })
        };
      } else {
        throw new Error('Invalid theme data structure');
      }
    } catch (parseError: unknown) {
      const errorMessage = parseError instanceof Error ? parseError.message : String(parseError);
      console.error('Error parsing JSON response:', errorMessage);
      
      // If direct parsing fails, try to extract JSON from the content
      // This handles cases where Claude might add some text despite instructions
      const jsonMatch = content.match(/\[\s*\{.*\}\s*\]/s);
      if (jsonMatch) {
        try {
          const extractedJson = JSON.parse(jsonMatch[0]);
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              themes: extractedJson
            })
          };
        } catch (e: unknown) {
          const errorMessage = e instanceof Error ? e.message : String(e);
          console.error('Failed to extract valid JSON:', errorMessage);
        }
      }
      
      // Return the raw content if JSON parsing fails
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          raw: content
        })
      };
    }
  } catch (error: unknown) {
    console.error('Error calling Claude API:', error);
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error details:', errorMessage);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Error generating color theme',
        details: errorMessage
      })
    };
  }
};
