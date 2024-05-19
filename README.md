# AWS Lambda Function + API Gateway + CDK TypeScript + sample OpenAI API integration

This is a starter project for CDK development with TypeScript and AWS Lambda + API Gateway.

The `cdk.json` file tells the CDK Toolkit how to execute your app.
This is a single `stack` cdk template.
each function has been introduced into the stack inside `lib/aws-lambda-cdk-stack.ts`.

## Useful commands

* `yarn build`   compile typescript to js
* `yarn run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
