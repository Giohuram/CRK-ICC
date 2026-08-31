import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/top-bar";
import { ResourceCard } from "@/components/resource-card";
import { FondsFilter } from "@/components/fonds-filter";
import {
  getResources,
  getThemes,
  getResourceTypes,
  getResourceLanguages,
  getResourceCountries,
} from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

export const metadata = {
  title: "Fonds documentaire — CRK-ICC",
};

export default async function FondsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const type = typeof params.type === "string" ? params.type : "";
  const themeSlug = typeof params.theme === "string" ? params.theme : "";
  const language = typeof params.language === "string" ? params.language : "";
  const country = typeof params.country === "string" ? params.country : "";

  const [resources, themes, types, languages, countries] = await Promise.all([
    getResources({ query, type, themeSlug, language, country }),
    getThemes(),
    getResourceTypes(),
    getResourceLanguages(),
    getResourceCountries(),
  ]);

  return (
    <div className="min-h-screen lg:pl-72">
      <AppSidebar />
      <div className="flex min-h-screen flex-col">
        <TopBar />
        <main className="flex-1 px-6 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <h1 className="font-serif text-3xl font-medium text-foreground">
                Fonds documentaire
              </h1>
              <p className="text-muted-foreground">
                Explorez les ressources référencées par le CRK-ICC.
              </p>
            </div>

            <FondsFilter
              types={types}
              themes={themes.map((t) => ({ slug: t.slug, name: t.name }))}
              languages={languages.filter((l): l is string => !!l)}
              countries={countries.filter((c): c is string => !!c)}
            />

            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {resources.length} résultat{resources.length > 1 ? "s" : ""}
              </div>
              <div className="flex flex-wrap gap-2">
                {query && (
                  <Badge variant="secondary" className="text-xs">
                    Recherche : {query}
                  </Badge>
                )}
                {type && (
                  <Badge variant="secondary" className="text-xs">
                    Type : {type}
                  </Badge>
                )}
              </div>
            </div>

            {resources.length > 0 ? (
              <div className="space-y-4">
                {resources.map((r) => (
                  <ResourceCard key={r.id} resource={r} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white py-20">
                <BookOpen className="mb-3 h-12 w-12 text-muted-foreground/50" />
                <p className="text-lg font-medium text-foreground">
                  Aucune ressource ne correspond à votre recherche.
                </p>
                <p className="text-sm text-muted-foreground">
                  Essayez d'autres mots-clés ou filtres.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
