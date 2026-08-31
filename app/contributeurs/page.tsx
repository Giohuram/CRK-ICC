import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/top-bar";
import { ContributorCard } from "@/components/contributor-card";
import { getContributors } from "@/lib/data";

export const metadata = {
  title: "Contributeurs — CRK-ICC",
};

export const dynamic = "force-dynamic";

export default async function ContributorsPage() {
  const contributors = await getContributors();

  return (
    <div className="min-h-screen lg:pl-72">
      <AppSidebar />
      <div className="flex min-h-screen flex-col">
        <TopBar />
        <main className="flex-1 px-6 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <h1 className="font-serif text-3xl font-medium text-foreground">
                Contributeurs
              </h1>
              <p className="text-muted-foreground">
                Découvrez les chercheurs, artistes et professionnels qui enrichissent le fonds documentaire.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {contributors.map((c) => (
                <ContributorCard key={c.id} contributor={c} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
