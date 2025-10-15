
export function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 text-accent px-3 py-1 text-xs border border-accent/30">{children}</span>;
}
