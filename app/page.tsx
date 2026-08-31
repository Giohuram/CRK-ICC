import Link from "next/link";
import Image from "next/image";
import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/top-bar";
import { StatsCard } from "@/components/stats-card";
import { ThemeIcon } from "@/components/theme-icon";
import { ResourceListItem } from "@/components/resource-list-item";
import { ContributorCard } from "@/components/contributor-card";
import { ActivityCard } from "@/components/activity-card";
import { Button } from "@/components/ui/button";
import {
  getStats,
  getThemes,
  getResources,
  getContributors,
  getActivities,
} from "@/lib/data";
import {
  ArrowRight,
  Library,
  Users,
  CalendarDays,
  PlusCircle,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [stats, themes, resources, contributors, activities] = await Promise.all([
    getStats(),
    getThemes(),
    getResources({}),
    getContributors(),
    getActivities(),
  ]);

  const recentResources = resources.slice(0, 3);
  const featuredContributors = contributors.slice(0, 3);
  const upcomingActivities = activities.slice(0, 3);

  return (
    <div className="min-h-screen lg:pl-72">
      <AppSidebar />
      <div className="flex min-h-screen flex-col">
        <TopBar />
        <main className="flex-1">
          <section className="relative overflow-hidden bg-[#f8f5ef]">
            <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-2">
              <div className="z-10 px-6 py-12 lg:py-20">
                <div className="max-w-xl">
                  <h1 className="mb-5 font-serif text-4xl font-normal leading-[1.15] text-[#1a1a2e] lg:text-5xl">
                    Le Centre de Ressources
                    <br />
                    sur les Industries{" "}
                    <span className="text-[#4a3b6e] font-medium">Culturelles</span>
                    <br />
                    et <span className="text-[#d4a853] font-medium">Créatives</span>
                  </h1>
                  <p className="mb-8 max-w-md text-base leading-relaxed text-[#5b5a6a]">
                    Un espace de documentation, de recherche et de partage au
                    service de la culture, du patrimoine et des ICC.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button
                      className="rounded-full bg-[#2a1a45] px-6 text-white hover:bg-[#3d255e]"
                      render={<Link href="/fonds" />}
                    >
                      <Library className="mr-2 h-4 w-4" />
                      Explorer le fonds documentaire
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full border-[#d4a853] px-6 text-[#2a1a45] hover:bg-[#d4a853]/10"
                      render={<Link href="/a-propos" />}
                    >
                      En savoir plus sur le CRK-ICC
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="relative hidden min-h-[420px] lg:block">
                <Image
                  src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=80"
                  alt="Bibliothèque et centre de ressources"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#f8f5ef] via-[#f8f5ef]/60 to-transparent" />
                <div className="absolute right-6 top-1/2 w-80 -translate-y-1/2">
                  <StatsCard {...stats} />
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 py-12">
            <div className="mx-auto max-w-7xl">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="font-serif text-2xl font-medium text-[#1a1a2e]">
                  Explorer par thématique
                </h2>
                <Link
                  href="/thematiques"
                  className="flex items-center gap-1 text-sm font-medium text-[#4a3b6e] hover:underline"
                >
                  Voir toutes les thématiques
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {themes.slice(0, 8).map((theme) => (
                  <Link
                    key={theme.slug}
                    href={`/thematiques/${theme.slug}`}
                    className="group flex flex-col items-center rounded-2xl border border-[#e9e3d8] bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <ThemeIcon
                      icon={theme.icon || "landmark"}
                      color={theme.color || "#2d1b4e"}
                      size="md"
                      className="mb-4 transition-transform group-hover:scale-110"
                    />
                    <div className="font-serif text-sm font-medium text-[#1a1a2e]">
                      {theme.name}
                    </div>
                    <div className="text-xs text-[#5b5a6a]">
                      {theme.resourcesCount} ressource
                      {theme.resourcesCount > 1 ? "s" : ""}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-[#f8f5ef] px-6 py-12">
            <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <div className="rounded-2xl bg-[#2a1a45] p-6 text-white shadow-lg">
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="font-serif text-xl font-medium text-white">
                      Ressources récentes
                    </h2>
                    <Link
                      href="/fonds"
                      className="text-xs font-medium text-[#d4a853] hover:underline"
                    >
                      Voir tout
                    </Link>
                  </div>
                  <div>
                    {recentResources.map((r) => (
                      <ResourceListItem key={r.id} resource={r} />
                    ))}
                  </div>
                  <Button
                    variant="link"
                    className="mt-2 px-0 text-[#d4a853] hover:text-amber-300"
                    render={<Link href="/fonds" />}
                  >
                    Voir plus de ressources
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="font-serif text-xl font-medium text-[#1a1a2e]">
                      Contributeurs à l'honneur
                    </h2>
                    <Link
                      href="/contributeurs"
                      className="text-xs font-medium text-[#4a3b6e] hover:underline"
                    >
                      Voir tout
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {featuredContributors.map((c) => (
                      <ContributorCard key={c.id} contributor={c} />
                    ))}
                  </div>
                  <Button
                    variant="link"
                    className="mt-4 px-0 text-[#4a3b6e]"
                    render={<Link href="/contributeurs" />}
                  >
                    Rejoindre le réseau des contributeurs
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="rounded-2xl bg-[#4a6c5a] p-6 text-white shadow-lg">
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="font-serif text-xl font-medium text-white">
                      Prochaines activités
                    </h2>
                    <Link
                      href="/activites"
                      className="text-xs font-medium text-[#d4a853] hover:underline"
                    >
                      Voir tout
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {upcomingActivities.map((a) => (
                      <ActivityCard key={a.id} activity={a} />
                    ))}
                  </div>
                  <Button
                    variant="link"
                    className="mt-4 px-0 text-[#d4a853] hover:text-amber-300"
                    render={<Link href="/activites" />}
                  >
                    Voir toutes les activités
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-[#d4a853] to-[#c79a47] px-6 py-10">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 rounded-2xl bg-white/15 px-8 py-8 backdrop-blur sm:flex-row">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-[#2a1a45]">
                  <PlusCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#2a1a45]">
                    Vous avez une ressource à partager ?
                  </h3>
                  <p className="text-sm text-[#2a1a45]/80">
                    Contribuez au développement du fonds documentaire du
                    CRK-ICC en proposant une référence pertinente.
                  </p>
                </div>
              </div>
              <Button
                className="rounded-full bg-[#2a1a45] px-6 text-white hover:bg-[#3d255e]"
                render={<Link href="/proposer" />}
              >
                Proposer une ressource
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </section>

          <div className="px-6 py-10 lg:hidden">
            <div className="mx-auto max-w-7xl">
              <StatsCard {...stats} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
