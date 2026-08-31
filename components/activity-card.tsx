import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Video } from "lucide-react";

function formatDate(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDay(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.getDate();
}

function formatMonth(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("fr-FR", { month: "short" }).toUpperCase();
}

export function ActivityCard({
  activity,
}: {
  activity: {
    id: string;
    title: string;
    date: Date | string;
    endDate?: Date | string | null;
    type: string;
    description?: string | null;
    location?: string | null;
    isOnline?: boolean;
  };
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[#e9e3d8] bg-white p-4 transition hover:shadow-md">
      <div className="flex h-16 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-[#4a6c5a]/10 text-[#4a6c5a]">
        <span className="text-[10px] font-semibold uppercase tracking-wide">{formatMonth(activity.date)}</span>
        <span className="text-2xl font-bold leading-none">{formatDay(activity.date)}</span>
      </div>
      <div className="min-w-0 flex-1">
        <Link
          href={`/activites/${activity.id}`}
          className="mb-1 block font-serif text-base font-semibold leading-tight text-[#1a1a2e] transition hover:text-[#4a3b6e]"
        >
          {activity.title}
        </Link>
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#5b5a6a]">
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            {formatDate(activity.date)}
            {activity.endDate && ` – ${formatDate(activity.endDate)}`}
          </span>
          {activity.location && (
            <span className="flex items-center gap-1">
              {activity.isOnline ? <Video className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}
              {activity.location}
            </span>
          )}
        </div>
      </div>
      <Badge
        variant="outline"
        className="hidden shrink-0 border-[#4a6c5a]/30 bg-[#4a6c5a]/5 text-[#4a6c5a] text-xs font-normal sm:inline-flex"
      >
        {activity.type}
      </Badge>
    </div>
  );
}
