import { Handler } from 'aws-cdk-lib/aws-lambda';
import { APIGatewayEvent, Context } from "aws-lambda";
import { processPrompt } from './open-ai-wrapper';

const handler: Handler = async function (event: APIGatewayEvent, context: Context) {

    try {
        const { body } = event;
        const { prompt } = JSON.parse(body || `{}`);

        // if prompt is not available
        if (!prompt) {
            return {
                statusCode: 422,
                headers: {},
                body: "prompt is missing is request body",
            }
        }

        const promptResponse = await processPrompt(prompt);

        // We only accept GET for now
        return {
            statusCode: 200,
            headers: {},
            body: promptResponse,
        }
    } catch (error) {
        return {
            statusCode: 400,
            headers: {},
            body: (error instanceof Error) ? error.stack : JSON.stringify(error, null, 2),
        }
    }
}

export { handler }