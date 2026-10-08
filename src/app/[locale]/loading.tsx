import {Container} from "@/components/ui/container";

export default function Loading() {
  return (
    <main className="min-h-[calc(100svh-5rem)] py-24" aria-busy="true" aria-label="Loading">
      <Container>
        <div className="h-4 w-32 animate-pulse rounded-full bg-white/10 motion-reduce:animate-none" />
        <div className="mt-6 h-14 max-w-3xl animate-pulse rounded-2xl bg-white/10 motion-reduce:animate-none" />
        <div className="mt-5 h-6 max-w-xl animate-pulse rounded-xl bg-white/5 motion-reduce:animate-none" />
      </Container>
    </main>
  );
}
