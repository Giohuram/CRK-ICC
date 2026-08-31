import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Bookmark, BookOpen } from "lucide-react";

export type ResourceListItemProps = {
  id: string;
  title: string;
  authors: string;
  year?: number | null;
  type: string;
  publisher?: string | null;
  themes?: { theme: { name: string; slug: string; color?: string | null } }[];
  keywords?: { name: string }[];
};

export function ResourceListItem({ resource }: { resource: ResourceListItemProps }) {
  const themeBadges = resource.themes?.slice(0, 3) || [];

  return (
    <div className="group flex items-start gap-4 rounded-xl border-b border-white/10 py-4 last:border-b-0">
      <div className="flex h-14 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#3d255e] text-white/80">
        <BookOpen className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-start justify-between gap-2">
          <Link
            href={`/ressources/${resource.id}`}
            className="text-sm font-semibold leading-snug text-white transition hover:text-[#d4a853]"
          >
            {resource.title}
          </Link>
          <button className="shrink-0 text-white/40 transition hover:text-[#d4a853]">
            <Bookmark className="h-4 w-4" />
          </button>
        </div>
        <div className="mb-2 text-xs text-white/60">
          {resource.authors}
          {resource.year && ` · ${resource.year}`}
          {resource.publisher && ` · ${resource.publisher}`}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {themeBadges.map(({ theme }) => (
            <Badge
              key={theme.slug}
              variant="outline"
              className="border-white/20 bg-white/5 text-[10px] font-normal text-white/80 hover:bg-white/10"
            >
              {theme.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
