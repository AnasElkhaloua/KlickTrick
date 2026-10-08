export function PageBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-[45rem] -top-[42rem] size-[82rem] rounded-full bg-[#009dff]/10 blur-[180px]" />
      <div className="absolute -right-[55rem] top-[35rem] size-[90rem] rounded-full bg-[#009dff]/10 blur-[200px]" />
    </div>
  );
}
