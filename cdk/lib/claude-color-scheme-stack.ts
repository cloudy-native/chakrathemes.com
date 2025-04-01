import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambdaNodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as path from "path";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";

const CLAUDE_SECRET_NAME = process.env.CLAUDE_SECRET_NAME || 'claude-api';
const CLAUDE_MODEL = process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20240620';

export class ClaudeColorThemeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const claudeSecret = Secret.fromSecretNameV2(this, "ClaudeSecret", CLAUDE_SECRET_NAME); 

    // Create Lambda function using TypeScript
    const colorThemeFunction = new lambdaNodejs.NodejsFunction(this, "ColorThemeFunction", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "handler",
      entry: path.join(__dirname, "../lambda/index.ts"), // TypeScript source file
      timeout: cdk.Duration.seconds(60), // Increased timeout for Claude API calls
      memorySize: 512, // Increased memory
      bundling: {
        minify: true,
        sourceMap: true,
        // Fix for esbuild 0.22.0+ breaking change (notice #30717)
        esbuildArgs: {
          "--packages": "bundle",
        },
        externalModules: [], // Include all dependencies
        nodeModules: [
          "axios",
          "@aws-sdk/client-secrets-manager"
        ], // Explicitly include these modules
      },
      environment: {
        NODE_OPTIONS: "--enable-source-maps", // Better error stack traces
        CLAUDE_MODEL,
        CLAUDE_SECRET_NAME
      },
    });
    
    claudeSecret.grantRead(colorThemeFunction);
    
    // Create API Gateway
    const api = new apigateway.RestApi(this, "ColorThemeApi", {
      restApiName: "Claude Color Theme API",
      description: "API for generating color themes using Claude AI direct API",
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS, // In production, specify your domain
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ["Content-Type", "X-Amz-Date", "Authorization", "X-Api-Key"],
      },
    });

    // Add Lambda integration
    const colorThemeIntegration = new apigateway.LambdaIntegration(colorThemeFunction);

    // Add API Gateway endpoint
    const colorThemeResource = api.root.addResource("generate-theme");
    colorThemeResource.addMethod("POST", colorThemeIntegration);

    // Output the API URL
    new cdk.CfnOutput(this, "ApiUrl", {
      value: `${api.url}generate-theme`,
      description: "URL for the Claude Color Theme API",
    });
  }
}
