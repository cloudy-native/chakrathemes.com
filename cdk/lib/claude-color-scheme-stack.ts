import { CfnOutput, Duration, Stack, type StackProps } from "aws-cdk-lib";
import {
	BasePathMapping,
	Cors,
	DomainName,
	EndpointType,
	LambdaIntegration,
	RestApi,
} from "aws-cdk-lib/aws-apigateway";
import { CfnApplicationInferenceProfile } from "aws-cdk-lib/aws-bedrock";
import {
	Certificate,
	CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import * as iam from "aws-cdk-lib/aws-iam";
import { Runtime, Tracing } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { CnameRecord, HostedZone } from "aws-cdk-lib/aws-route53";
import type { Construct } from "constructs";
import * as path from "path";

// Bedrock model envs (default to Amazon Nova Micro)
const MODEL_ID = process.env.MODEL_ID || "amazon.nova-micro-v1:0";
const MODEL_TEMPERATURE = process.env.MODEL_TEMPERATURE || "0.7";
const MODEL_MAX_TOKENS = process.env.MODEL_MAX_TOKENS || "2000";

export interface ClaudeColorThemeStackProps extends StackProps {
	domainName: string;
	apiDomainName: string;
}

export class ClaudeColorThemeStack extends Stack {
	constructor(scope: Construct, id: string, props: ClaudeColorThemeStackProps) {
		super(scope, id, props);

		const { domainName, apiDomainName } = props;

		const { region } = Stack.of(this);

		const foundationModelArn = `arn:aws:bedrock:${region}::foundation-model/${MODEL_ID}`;
		const inferenceProfile = new CfnApplicationInferenceProfile(
			this,
			"ChakraThemesInferenceProfile",
			{
				inferenceProfileName: `chakrathemes-${region}-inference-profile`,
				modelSource: {
					copyFrom: foundationModelArn,
				},
			},
		);

		// Create Lambda function using TypeScript
		const colorThemeFunction = new NodejsFunction(this, "ColorThemeFunction", {
			runtime: Runtime.NODEJS_18_X,
			handler: "handler",
			entry: path.join(__dirname, "../lambda/index.ts"), // TypeScript source file
			timeout: Duration.seconds(60), // Increased timeout for Claude API calls
			memorySize: 512, // Increased memory
			tracing: Tracing.ACTIVE,
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
				nodeModules: ["@aws-sdk/client-bedrock-runtime"],
			},
			environment: {
				NODE_OPTIONS: "--enable-source-maps", // Better error stack traces
				MODEL_ID,
				MODEL_TEMPERATURE,
				MODEL_MAX_TOKENS,
				INFERENCE_PROFILE_ARN: inferenceProfile.attrInferenceProfileArn,
				NODE_ENV: "production",
			},
		});

		// Allow Lambda to invoke Bedrock using the model and/or the inference profile
		colorThemeFunction.addToRolePolicy(
			new iam.PolicyStatement({
				actions: ["bedrock:InvokeModel"],
				resources: [
					`arn:aws:bedrock:${region}::foundation-model/${MODEL_ID}`,
					inferenceProfile.attrInferenceProfileArn,
				],
			}),
		);

		// Create API Gateway
		const api = new RestApi(this, "ColorThemeApi", {
			restApiName: "AI Color Theme API",
			description: "API for generating color themes using Amazon Bedrock",
			defaultCorsPreflightOptions: {
				allowOrigins: Cors.ALL_ORIGINS, // In production, specify your domain
				allowMethods: Cors.ALL_METHODS,
				allowHeaders: [
					"Content-Type",
					"X-Amz-Date",
					"Authorization",
					"X-Api-Key",
				],
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
			validation: CertificateValidation.fromDns(hostedZone),
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
			description: "URL for the AI Color Theme API",
		});
	}
}
