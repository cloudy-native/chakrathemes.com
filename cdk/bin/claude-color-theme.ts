#!/opt/homebrew/opt/node/bin/node
import * as cdk from 'aws-cdk-lib';
import { ClaudeColorThemeStack } from '../lib/claude-color-scheme-stack';

const app = new cdk.App();

const env: cdk.Environment = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

new ClaudeColorThemeStack(app, 'ClaudeColorStack', { env });