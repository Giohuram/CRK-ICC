import { notFound } from "next/navigation";
import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/top-bar";
import { ResourceCard } from "@/components/resource-card";
import { ThemeIcon } from "@/components/theme-icon";
import { getThemeBySlug, getThemes } from "@/lib/data";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Thématique — CRK-ICC",
};

export async function generateStaticParams() {
  return [];
}

export default async function ThemePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const theme = await getThemeBySlug(slug);
  if (!theme) notFound();

  const resources = (theme as any).resources || [];

  return (
    <div className="min-h-screen lg:pl-72">
      <AppSidebar />
      <div className="flex min-h-screen flex-col">
        <TopBar />
        <main className="flex-1 px-6 py-8">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/thematiques"
              className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Toutes les thématiques
            </Link>
            <div className="mb-8 flex items-center gap-5">
              <ThemeIcon
                icon={theme.icon || "landmark"}
                color={theme.color || "#2d1b4e"}
                className="h-16 w-16"
              />
              <div>
                <h1 className="font-serif text-3xl font-medium text-foreground">
                  {theme.name}
                </h1>
                <p className="text-muted-foreground">
                  {resources.length} ressource{resources.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>
            {theme.description && (
              <p className="mb-8 max-w-3xl text-muted-foreground">
                {theme.description}
              </p>
            )}
            <div className="space-y-4">
              {resources.length > 0 ? (
                resources.map((r: any) => <ResourceCard key={r.id} resource={r} />)
              ) : (
                <p className="text-muted-foreground">
                  Aucune ressource publiée dans cette thématique pour le moment.
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
