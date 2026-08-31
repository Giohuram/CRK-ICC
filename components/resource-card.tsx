import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink } from "lucide-react";

export type ResourceCardProps = {
  id: string;
  title: string;
  authors: string;
  year?: number | null;
  type: string;
  publisher?: string | null;
  abstract?: string | null;
  externalLink?: string | null;
  isAvailable?: boolean;
  themes?: { theme: { name: string; slug: string; color?: string | null } }[];
  keywords?: { name: string }[];
};

export function ResourceCard({ resource }: { resource: ResourceCardProps }) {
  return (
    <div className="group flex gap-4 rounded-2xl border border-border bg-white p-4 transition hover:shadow-md">
      <div className="flex h-16 w-12 shrink-0 items-center justify-center rounded-lg bg-plum/5 text-plum">
        <BookOpen className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-start justify-between gap-3">
          <Link
            href={`/ressources/${resource.id}`}
            className="font-serif text-lg font-medium leading-tight text-foreground transition hover:text-plum"
          >
            {resource.title}
          </Link>
        </div>
        <div className="mb-2 text-sm text-muted-foreground">
          {resource.authors}
          {resource.year && ` · ${resource.year}`}
          {resource.publisher && ` · ${resource.publisher}`}
        </div>
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
          {resource.abstract}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="text-xs font-normal">
            {resource.type}
          </Badge>
          {resource.themes?.slice(0, 3).map(({ theme }) => (
            <Badge
              key={theme.slug}
              variant="outline"
              className="text-xs font-normal"
              style={{
                borderColor: theme.color ? `${theme.color}40` : undefined,
                color: theme.color || undefined,
              }}
            >
              {theme.name}
            </Badge>
          ))}
          {resource.isAvailable && resource.externalLink && (
            <Badge
              variant="outline"
              className="gap-1 border-forest/30 text-forest text-xs font-normal"
              render={
                <a href={resource.externalLink} target="_blank" rel="noreferrer" />
              }
            >
              <ExternalLink className="h-3 w-3" />
              Disponible
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
