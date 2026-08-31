import { notFound } from "next/navigation";
import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/top-bar";
import { ResourceCard } from "@/components/resource-card";
import { getDossierBySlug } from "@/lib/data";
import { ArrowLeft, FolderOpen } from "lucide-react";

export const metadata = {
  title: "Dossier thématique — CRK-ICC",
};

export async function generateStaticParams() {
  return [];
}

export default async function DossierPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dossier = await getDossierBySlug(slug);
  if (!dossier) notFound();

  const resources = (dossier as any).resources || [];

  return (
    <div className="min-h-screen lg:pl-72">
      <AppSidebar />
      <div className="flex min-h-screen flex-col">
        <TopBar />
        <main className="flex-1 px-6 py-8">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/dossiers"
              className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Tous les dossiers
            </Link>

            <div className="mb-8 flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                <FolderOpen className="h-8 w-8" />
              </div>
              <div>
                <h1 className="font-serif text-3xl font-medium leading-tight text-foreground">
                  {dossier.title}
                </h1>
                <p className="text-muted-foreground">
                  {resources.length} ressource{resources.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {dossier.description && (
              <p className="mb-8 max-w-3xl text-muted-foreground">
                {dossier.description}
              </p>
            )}

            <div className="space-y-4">
              {resources.length > 0 ? (
                resources.map((r: any) => <ResourceCard key={r.id} resource={r} />)
              ) : (
                <p className="text-muted-foreground">
                  Ce dossier sera enrichi après l'atelier de revue documentaire.
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
