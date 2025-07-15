"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";



export default function Home() {
  const trpc = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions({}));

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1>Home</h1>

      <Button disabled={invoke.isPending} onClick={() => invoke.mutate({ text: 'client' })}>
        INvokee
      </Button>

      {invoke.isPending && <p>Invoking...</p>}
      {invoke.isSuccess && <p>Invoked</p>}
      {invoke.isError && <p>Error</p>}
    </div>
  );
}
