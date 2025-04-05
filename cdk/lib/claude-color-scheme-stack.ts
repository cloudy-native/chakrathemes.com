import { CfnOutput, Duration, Stack, StackProps } from "aws-cdk-lib";
import {
  BasePathMapping,
  Cors,
  DomainName,
  EndpointType,
  LambdaIntegration,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";
import { Certificate, CertificateValidation } from "aws-cdk-lib/aws-certificatemanager";
import { Runtime, Tracing } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { CnameRecord, HostedZone } from "aws-cdk-lib/aws-route53";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";
import * as path from "path";

const CLAUDE_SECRET_NAME = process.env.CLAUDE_SECRET_NAME || "claude-api";
const CLAUDE_MODEL = process.env.CLAUDE_MODEL || "claude-3-5-sonnet-20240620";

export interface ClaudeColorThemeStackProps extends StackProps {
  domainName: string;
  apiDomainName: string;
}

export class ClaudeColorThemeStack extends Stack {
  constructor(scope: Construct, id: string, props: ClaudeColorThemeStackProps) {
    super(scope, id, props);

    const { domainName, apiDomainName } = props;
    const claudeSecret = Secret.fromSecretNameV2(this, "ClaudeSecret", CLAUDE_SECRET_NAME);

    // Create Lambda function using TypeScript
    const colorThemeFunction = new NodejsFunction(this, "ColorThemeFunction", {
      runtime: Runtime.NODEJS_18_X,
      handler: "handler",
      entry: path.join(__dirname, "../lambda/index.ts"), // TypeScript source file
      timeout: Duration.seconds(60), // Increased timeout for Claude API calls
      memorySize: 512, // Increased memory
      tracing: Tracing.ACTIVE,
      logRetention: RetentionDays.ONE_WEEK,
      bundling: {
        minify: true,
        sourceMap: true,
        // Fix for esbuild 0.22.0+ breaking change (notice #30717)
        esbuildArgs: {
          "--packages": "bundle",
          "--tree-shaking": "true",
          "--platform": "node",
        },
        externalModules: ["@aws-sdk/*"],
        nodeModules: ["@aws-sdk/client-secrets-manager"], // Explicitly include these modules
      },
      environment: {
        NODE_OPTIONS: "--enable-source-maps", // Better error stack traces
        CLAUDE_MODEL,
        CLAUDE_SECRET_NAME,
        NODE_ENV: "production",
      },
    });

    claudeSecret.grantRead(colorThemeFunction);

    // Create API Gateway
    const api = new RestApi(this, "ColorThemeApi", {
      restApiName: "Claude Color Theme API",
      description: "API for generating color themes using Claude AI direct API",
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS, // In production, specify your domain
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: ["Content-Type", "X-Amz-Date", "Authorization", "X-Api-Key"],
        maxAge: Duration.days(1),
      },
      deployOptions: {
        stageName: "prod",
        throttlingRateLimit: 10,
        throttlingBurstLimit: 20,
      },
    });

    // Add Lambda integration
    const colorThemeIntegration = new LambdaIntegration(colorThemeFunction);

    // Add API Gateway endpoint
    const colorThemeResource = api.root.addResource("generate-theme");
    colorThemeResource.addMethod("POST", colorThemeIntegration);

    const hostedZone = HostedZone.fromLookup(this, "HostedZone", {
      domainName,
    });

    const certificate = new Certificate(this, "Certificate", {
      domainName: apiDomainName,
      validation: CertificateValidation.fromDns(hostedZone)
    });

    const domain = new DomainName(this, "ApiDomain", {
      domainName: apiDomainName,
      certificate,
      endpointType: EndpointType.EDGE,
    });

    new BasePathMapping(this, "ApiMapping", {
      domainName: domain,
      restApi: api,
    });

    new CnameRecord(this, "ApiCnameRecord", {
      zone: hostedZone,
      recordName: apiDomainName, // api.chakrathemes.com
      domainName: domain.domainNameAliasDomainName,
    });

    // Output the API URL
    new CfnOutput(this, "ApiUrl", {
      value: `${api.url}generate-theme`,
      description: "URL for the Claude Color Theme API",
    });
  }
}
