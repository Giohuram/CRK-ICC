import { notFound } from "next/navigation";
import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/top-bar";
import { ResourceCard } from "@/components/resource-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getContributorById } from "@/lib/data";
import { ArrowLeft, BookOpen, Award } from "lucide-react";

export const metadata = {
  title: "Contributeur — CRK-ICC",
};

export async function generateStaticParams() {
  return [];
}

export default async function ContributorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contributor = await getContributorById(id);
  if (!contributor) notFound();

  const resources = (contributor as any).resources || [];
  const initials = contributor.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen lg:pl-72">
      <AppSidebar />
      <div className="flex min-h-screen flex-col">
        <TopBar />
        <main className="flex-1 px-6 py-8">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/contributeurs"
              className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Tous les contributeurs
            </Link>

            <div className="mb-8 rounded-2xl border border-border bg-white p-8">
              <div className="mb-6 flex flex-col items-start gap-6 sm:flex-row">
                <Avatar className="h-24 w-24 border border-border">
                  <AvatarImage src={contributor.photoUrl || undefined} />
                  <AvatarFallback className="bg-plum/10 text-2xl text-plum">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="font-serif text-3xl font-medium text-foreground">
                    {contributor.name}
                  </h1>
                  <div className="mb-3 text-muted-foreground">
                    {contributor.title}
                    {contributor.institution && ` · ${contributor.institution}`}
                    {contributor.function && ` · ${contributor.function}`}
                  </div>
                  {contributor.expertise && (
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-plum">
                      <Award className="h-3.5 w-3.5" />
                      {contributor.expertise}
                    </div>
                  )}
                </div>
              </div>
              {contributor.bio && (
                <div className="mb-6">
                  <h2 className="mb-2 font-serif text-lg font-medium text-foreground">
                    Biographie
                  </h2>
                  <p className="leading-relaxed text-muted-foreground">
                    {contributor.bio}
                  </p>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4 text-gold" />
                {resources.length} ressource{resources.length > 1 ? "s" : ""} proposée
                {resources.length > 1 ? "s" : ""} au CRK-ICC
              </div>
            </div>

            {resources.length > 0 && (
              <div>
                <h2 className="mb-4 font-serif text-2xl font-medium text-foreground">
                  Contributions
                </h2>
                <div className="space-y-4">
                  {resources.map((r: any) => (
                    <ResourceCard key={r.id} resource={r} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
