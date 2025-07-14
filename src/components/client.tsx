"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export default function Client() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.hello.queryOptions({ text: 'client PREFETCHED' }));

  return (
    <div>
      <h1>Client</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}