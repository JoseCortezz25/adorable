import { inngest } from './client';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY
});

export const generateApp = inngest.createFunction(
  { id: 'generate-app' },
  { event: 'test/generate.app' },
  async ({ event }) => {
    try {
      const result = await generateText({
        model: google('gemini-2.0-flash-001'),
        prompt: `You are an Agent App Builder. Your goal is to build an Next.js app based on the user's prompt.
        The user's prompt is: ${event.data.value}
        The app should be built using the following technologies:
        - Next.js
        - Tailwind CSS
        - Shadcn UI`
      });

      console.log(result.text);
      return { message: result.text };
    } catch (error) {
      console.error(error);
      return { message: 'Error generating app' };
    }
  }
);
