import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bookmark } from "lucide-react";

export function ContributorCard({
  contributor,
}: {
  contributor: {
    id: string;
    name: string;
    title?: string | null;
    institution?: string | null;
    function?: string | null;
    bio?: string | null;
    photoUrl?: string | null;
    resources?: unknown[];
  };
}) {
  const initials = contributor.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[#e9e3d8] bg-white p-4 transition hover:shadow-md">
      <Avatar className="h-14 w-14 border border-[#e9e3d8]">
        <AvatarImage src={contributor.photoUrl || undefined} />
        <AvatarFallback className="bg-[#2a1a45]/10 text-[#2a1a45]">{initials}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <Link
          href={`/contributeurs/${contributor.id}`}
          className="block font-serif text-base font-semibold text-[#1a1a2e] transition hover:text-[#4a3b6e]"
        >
          {contributor.name}
        </Link>
        <div className="text-xs text-[#5b5a6a]">
          {contributor.title}
          {contributor.institution && ` · ${contributor.institution}`}
        </div>
        <div className="mt-1 text-xs text-[#5b5a6a]">
          {contributor.resources ? contributor.resources.length : 0} ressource
          {(contributor.resources?.length ?? 0) > 1 ? "s" : ""} proposée
          {(contributor.resources?.length ?? 0) > 1 ? "s" : ""}
        </div>
      </div>
      <button className="shrink-0 text-[#e9e3d8] transition hover:text-[#d4a853]">
        <Bookmark className="h-5 w-5" />
      </button>
    </div>
  );
}
