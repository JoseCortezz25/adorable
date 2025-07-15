import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hellowor-ld" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "90s");
    return { message: `Hello ${event.data.email}!` };
  }
);