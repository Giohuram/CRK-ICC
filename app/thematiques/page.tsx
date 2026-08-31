import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/top-bar";
import { ThemeIcon } from "@/components/theme-icon";
import { getThemes } from "@/lib/data";

export const metadata = {
  title: "Thématiques — CRK-ICC",
};

export const dynamic = "force-dynamic";

export default async function ThemesPage() {
  const themes = await getThemes();

  return (
    <div className="min-h-screen lg:pl-72">
      <AppSidebar />
      <div className="flex min-h-screen flex-col">
        <TopBar />
        <main className="flex-1 px-6 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <h1 className="font-serif text-3xl font-medium text-foreground">
                Thématiques
              </h1>
              <p className="text-muted-foreground">
                Parcourez le fonds documentaire par domaine culturel et créatif.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {themes.map((theme) => (
                <Link
                  key={theme.slug}
                  href={`/thematiques/${theme.slug}`}
                  className="group flex items-start gap-5 rounded-2xl border border-border bg-white p-6 transition hover:shadow-md"
                >
                  <ThemeIcon
                    icon={theme.icon || "landmark"}
                    color={theme.color || "#2d1b4e"}
                    className="transition-transform group-hover:scale-110"
                  />
                  <div>
                    <div className="font-serif text-lg font-medium text-foreground">
                      {theme.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {theme.resourcesCount} ressource
                      {theme.resourcesCount > 1 ? "s" : ""}
                    </div>
                    {theme.description && (
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {theme.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
