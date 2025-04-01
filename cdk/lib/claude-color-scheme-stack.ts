import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambdaNodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";
import * as iam from "aws-cdk-lib/aws-iam";
import * as path from "path";

export class ClaudeColorThemeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const claudeApiKeySecret = secretsmanager.Secret.fromSecretNameV2(
      this,
      "ClaudeApiKeySecret",
      "claude-api-secret"
    );

    // Create Lambda function using TypeScript
    const colorThemeFunction = new lambdaNodejs.NodejsFunction(this, "ColorThemeFunction", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "handler",
      entry: path.join(__dirname, "../lambda/index.ts"), // TypeScript source file
      timeout: cdk.Duration.seconds(30),
      memorySize: 256,
      bundling: {
        minify: true,
        sourceMap: true,
        // Fix for esbuild 0.22.0+ breaking change (notice #30717)
        esbuildArgs: {
          "--packages": "bundle",
        },
        externalModules: [], // Include all dependencies
        nodeModules: ["axios", "@aws-sdk/client-secrets-manager"], // Explicitly include these modules
      },
      environment: {
        NODE_OPTIONS: "--enable-source-maps", // Better error stack traces
      },
    });

    claudeApiKeySecret.grantRead(colorThemeFunction);
    
    // Create API Gateway
    const api = new apigateway.RestApi(this, "ColorThemeApi", {
      restApiName: "Claude Color Theme API",
      description: "API for generating color themes using Claude AI",
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
