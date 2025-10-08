import { inngest } from './client';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import { Sandbox } from '@e2b/code-interpreter';
import { getSandbox } from './utils';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY
});

export const generateApp = inngest.createFunction(
  { id: 'generate-app' },
  { event: 'test/generate.app' },
  async ({ event, step }) => {
    try {
      const sandboxId = await step.run('get-sandbox-id', async () => {
        const sandbox = await Sandbox.create('adorable-nextjs-2');
        return sandbox.sandboxId
      });

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

      const sandboxURL = await step.run('get-sandbox-url', async () => {
        const sandbox = await getSandbox(sandboxId);
        const host = sandbox.getHost(3000);
        return `https://${host}`;
      });

      return { message: result.text, sandboxURL };
    } catch (error) {
      console.error(error);
      return { message: 'Error generating app' };
    }
  }
);
