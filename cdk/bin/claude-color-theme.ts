#!/opt/homebrew/opt/node/bin/node
import { App, Environment } from "aws-cdk-lib";
import { ClaudeColorThemeStack } from "../lib/claude-color-scheme-stack";

const app = new App();

const env: Environment = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const tags = {
  Project: "chakrathemes.com",
  Environment: "production",
  Owner: "stephen",
};

new ClaudeColorThemeStack(app, "ClaudeColorStack", {
  env,
  tags,
  domainName: "chakrathemes.com",
  apiDomainName: "api.chakrathemes.com",
});
