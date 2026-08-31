import { BookOpen, Users, Grid3X3, CalendarDays, ArrowRight } from "lucide-react";
import Link from "next/link";

export function StatsCard({
  resourcesCount,
  contributorsCount,
  themesCount,
  activitiesCount,
}: {
  resourcesCount: number;
  contributorsCount: number;
  themesCount: number;
  activitiesCount: number;
}) {
  const items = [
    { icon: BookOpen, value: resourcesCount, label: "Ressources référencées" },
    { icon: Users, value: contributorsCount, label: "Contributeurs" },
    { icon: Grid3X3, value: themesCount, label: "Thématiques couvertes" },
    { icon: CalendarDays, value: activitiesCount, label: "Activités organisées" },
  ];

  return (
    <div className="rounded-2xl bg-[#2a1a45] p-6 text-white shadow-2xl">
      <h3 className="mb-5 text-sm font-medium uppercase tracking-wide text-white/80">
        En quelques chiffres
      </h3>
      <div className="space-y-4">
        {items.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
              <Icon className="h-5 w-5 text-[#d4a853]" />
            </div>
            <div>
              <div className="text-2xl font-semibold leading-none">{value}</div>
              <div className="text-xs text-white/70">{label}</div>
            </div>
          </div>
        ))}
      </div>
      <Link
        href="/a-propos"
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#d4a853] transition hover:text-amber-300"
      >
        Découvrir l'impact du centre
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
