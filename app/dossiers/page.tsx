import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/top-bar";
import { FolderOpen } from "lucide-react";
import { getDossiers } from "@/lib/data";

export const metadata = {
  title: "Dossiers thématiques — CRK-ICC",
};

export default async function DossiersPage() {
  const dossiers = await getDossiers();

  return (
    <div className="min-h-screen lg:pl-72">
      <AppSidebar />
      <div className="flex min-h-screen flex-col">
        <TopBar />
        <main className="flex-1 px-6 py-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8">
              <h1 className="font-serif text-3xl font-medium text-foreground">
                Dossiers thématiques
              </h1>
              <p className="text-muted-foreground">
                Collections thématiques issues des ateliers et des revues documentaires.
              </p>
            </div>
            <div className="space-y-4">
              {dossiers.length > 0 ? (
                dossiers.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/dossiers/${d.slug}`}
                    className="flex items-start gap-5 rounded-2xl border border-border bg-white p-6 transition hover:shadow-md"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                      <FolderOpen className="h-7 w-7" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-medium text-foreground">
                        {d.title}
                      </h2>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {d.description}
                      </p>
                      <div className="mt-2 text-xs text-muted-foreground">
                        {(d as any).resources?.length || 0} ressource
                        {((d as any).resources?.length || 0) > 1 ? "s" : ""}
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-muted-foreground">
                  Aucun dossier thématique disponible pour le moment.
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
