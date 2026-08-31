import { notFound } from "next/navigation";
import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/top-bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getResourceById, getResources } from "@/lib/data";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Globe,
  Languages,
  Building2,
  ExternalLink,
  User,
  Quote,
} from "lucide-react";
import { CopyButton } from "@/components/copy-button";

export async function generateStaticParams() {
  return [];
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const resource = await getResourceById(id);
  if (!resource) notFound();

  const canAccess = resource.isAvailable && resource.externalLink;
  const relatedResources = (await getResources({}))
    .filter((r) => r.id !== resource.id && r.themes?.some((t) =>
      resource.themes?.some((rt) => rt.theme.slug === t.theme.slug)
    ))
    .slice(0, 3);

  return (
    <div className="min-h-screen lg:pl-72">
      <AppSidebar />
      <div className="flex min-h-screen flex-col">
        <TopBar />
        <main className="flex-1 px-6 py-8">
          <div className="mx-auto max-w-5xl">
            <Button
              variant="ghost"
              className="mb-4 px-0 text-muted-foreground hover:text-foreground"
              render={<Link href="/fonds" />}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au fonds documentaire
            </Button>

            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
              <div>
                <div className="mb-4 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {resource.type}
                  </Badge>
                  {resource.themes?.map(({ theme }) => (
                    <Badge
                      key={theme.slug}
                      variant="outline"
                      className="text-xs"
                      style={{
                        borderColor: theme.color ? `${theme.color}40` : undefined,
                        color: theme.color || undefined,
                      }}
                    >
                      {theme.name}
                    </Badge>
                  ))}
                </div>
                <h1 className="mb-4 font-serif text-3xl font-medium leading-tight text-foreground lg:text-4xl">
                  {resource.title}
                </h1>
                <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {resource.authors}
                  </span>
                  {resource.year && (
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {resource.year}
                    </span>
                  )}
                  {resource.publisher && (
                    <span className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      {resource.publisher}
                    </span>
                  )}
                  {resource.country && (
                    <span className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      {resource.country}
                    </span>
                  )}
                  {resource.language && (
                    <span className="flex items-center gap-1">
                      <Languages className="h-4 w-4" />
                      {resource.language}
                    </span>
                  )}
                </div>

                {resource.abstract && (
                  <div className="mb-8">
                    <h2 className="mb-2 font-serif text-xl font-medium text-foreground">
                      Résumé
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">
                      {resource.abstract}
                    </p>
                  </div>
                )}

                {resource.fullReference && (
                  <Card className="mb-8 border-gold/30 bg-gold/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 font-serif text-base">
                        <Quote className="h-4 w-4 text-gold" />
                        Référence bibliographique
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-foreground">
                        {resource.fullReference}
                      </p>
                      <CopyButton text={resource.fullReference} />
                    </CardContent>
                  </Card>
                )}

                {resource.keywords && resource.keywords.length > 0 && (
                  <div className="mb-8">
                    <h2 className="mb-2 font-serif text-xl font-medium text-foreground">
                      Mots-clés
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {resource.keywords.map((k) => (
                        <Badge key={k.name} variant="secondary" className="text-xs">
                          {k.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="font-serif text-base">Accès</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {canAccess ? (
                      <Button
                        className="w-full gap-2 rounded-lg bg-forest text-white hover:bg-forest/90"
                        render={
                          <a href={resource.externalLink!} target="_blank" rel="noreferrer" />
                        }
                      >
                        <ExternalLink className="h-4 w-4" />
                        Consulter la ressource
                      </Button>
                    ) : (
                      <div className="rounded-lg border border-dashed border-border bg-muted p-4 text-center text-sm text-muted-foreground">
                        <BookOpen className="mx-auto mb-2 h-6 w-6" />
                        Cette ressource est uniquement référencée. Le
                        CRK-ICC ne dispose pas des droits de diffusion.
                      </div>
                    )}
                    <Button
                      variant="outline"
                      className="w-full gap-2 rounded-lg border-plum text-plum hover:bg-plum/5"
                      render={<Link href="/proposer" />}
                    >
                      Proposer une ressource similaire
                    </Button>
                  </CardContent>
                </Card>

                {resource.contributor && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="font-serif text-base">
                        Contributeur
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Link
                        href={`/contributeurs/${resource.contributor.id}`}
                        className="font-medium text-foreground hover:text-plum"
                      >
                        {resource.contributor.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {resource.contributor.title}
                        {resource.contributor.institution &&
                          ` · ${resource.contributor.institution}`}
                      </p>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="font-serif text-base">
                      Métadonnées
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type</span>
                      <span>{resource.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Langue</span>
                      <span>{resource.language || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Zone</span>
                      <span>{resource.country || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Année</span>
                      <span>{resource.year || "—"}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {relatedResources.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-4 font-serif text-2xl font-medium text-foreground">
                  Ressources similaires
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {relatedResources.map((r) => (
                    <Link
                      key={r.id}
                      href={`/ressources/${r.id}`}
                      className="rounded-2xl border border-border bg-white p-5 transition hover:shadow-md"
                    >
                      <div className="mb-2 font-serif text-base font-medium text-foreground">
                        {r.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {r.authors} {r.year && `· ${r.year}`}
                      </div>
                    </Link>
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
