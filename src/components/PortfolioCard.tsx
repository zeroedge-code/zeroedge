
import { ArrowUpRight } from "lucide-react";

export function PortfolioCard({ title, subtitle, href }: { title: string; subtitle: string; href?: string; }) {
  return (
    <a href={href ?? "#"} target={href ? "_blank" : undefined} className="card p-5 hover:border-accent/60 hover:bg-white/10 transition-colors group">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-white/60">{subtitle}</p>
        </div>
        <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={18} />
      </div>
    </a>
  );
}
