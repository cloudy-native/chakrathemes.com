import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { BedrockRuntimeClient, ConverseCommand } from '@aws-sdk/client-bedrock-runtime';

interface RequestBody {
  prompt: string;
}

// Bedrock settings via env
const MODEL_ID = process.env.MODEL_ID || 'amazon.nova-micro-v1:0';
const MODEL_TEMPERATURE  = process.env.MODEL_TEMPERATURE || '0.7';
const MODEL_MAX_TOKENS = process.env.MODEL_MAX_TOKENS || '2000';
const INFERENCE_PROFILE_ARN = process.env.INFERENCE_PROFILE_ARN || '';

// Initialize Bedrock Runtime client
const bedrock = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || 'us-east-1'
});

// Log which model we're using for debugging
console.log('Using Bedrock model or profile:', MODEL_ID, INFERENCE_PROFILE_ARN ? `(profile: ${INFERENCE_PROFILE_ARN})` : '');

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
  
  // Call Amazon Bedrock using Converse API (Amazon Nova models)
  try {
    // Prepare the system prompt
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
    // Build Converse inputs
    const messages = [
      {
        role: 'user' as const,
        content: [
          {
            text: `${systemPrompt}\n\nUser input: ${prompt}`,
          },
        ],
      },
    ];

    const system = [
      {
        text: 'You are an assistant that outputs only valid JSON as specified. Do not add any prose.',
      },
    ];

    const response = await bedrock.send(
      new ConverseCommand({
        modelId: MODEL_ID,
        messages,
        system,
        inferenceConfig: {
          maxTokens: Number(MODEL_MAX_TOKENS),
          temperature: Number(MODEL_TEMPERATURE),
          topP: 0.9,
          stopSequences: [],
        },
        // Note: Converse currently does not accept inferenceProfileArn; we rely on modelId
      })
    );

    console.log('Bedrock Converse response received.');

    // Extract text from Converse response
    const content = (
      ((response?.output?.message?.content?.find(
        (c: { text?: unknown }) => typeof c?.text === 'string'
      ) as { text?: string } | undefined)?.text || '')
    ).trim();

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
      // This handles cases where the model might add some text despite instructions
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
          const err2 = e instanceof Error ? e.message : String(e);
          console.error('Failed to extract valid JSON:', err2);
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
    console.error('Error calling Bedrock API:', error);
    
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
