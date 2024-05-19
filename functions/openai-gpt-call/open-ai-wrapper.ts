import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

export const processPrompt = async (prompt: string) => {
    try {
        const params: OpenAI.Chat.ChatCompletionCreateParams = {
            model: 'gpt-4o',
            messages: [{ role: 'user', content: prompt }],
        };
        const completion = await openai.chat.completions.create(params);
        return completion?.choices[0]?.message?.content || null;
    } catch (error) {
        console.log('Error checking with GPT => ', error);
        return null
    }
}