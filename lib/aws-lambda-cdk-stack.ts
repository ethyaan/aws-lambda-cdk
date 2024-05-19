import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { execSync } from 'child_process';
import * as dotenv from 'dotenv';
dotenv.config();

export class AwsLambdaCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    execSync('npm run build', { stdio: 'inherit' });

    const fn = new lambda.Function(this, 'openai-gpt-call', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('functions/openai-gpt-call/build'),
      timeout: cdk.Duration.seconds(30),
      environment: {
        OPEN_AI_API_KEY: String(process.env.OPEN_AI_API_KEY)
      }
    });

    // Define the API Gateway REST API
    const api = new apigateway.RestApi(this, 'FunctionsAPIGateWay', {
      restApiName: 'ServerLess Functions',
      description: 'Multiple Serverless APIs',
    });

    // Integrate the Lambda function with the API Gateway
    const lambdaIntegration = new apigateway.LambdaIntegration(fn);
    const apiResource = api.root.addResource('gpt-call');
    apiResource.addMethod('POST', lambdaIntegration); // POST /gpt-call

  }
}
