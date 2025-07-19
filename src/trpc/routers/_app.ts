import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { inngest } from '@/inngest/client';

export const appRouter = createTRPCRouter({
  invoke: baseProcedure
  .input(
    z.object({
      value: z.string()
    })
  )
  .mutation(async ({ input }) => {
    await inngest.send({
      name: 'test/generate.app',
      data: {
        value: input.value
      }
    });

    return { ok: 'success' };
  })
});

// export type definition of API
export type AppRouter = typeof appRouter;