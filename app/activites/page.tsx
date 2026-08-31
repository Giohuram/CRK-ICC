import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/top-bar";
import { ActivityCard } from "@/components/activity-card";
import { getActivities } from "@/lib/data";

export const metadata = {
  title: "Activités du Centre — CRK-ICC",
};

export const dynamic = "force-dynamic";

export default async function ActivitiesPage() {
  const activities = await getActivities();

  return (
    <div className="min-h-screen lg:pl-72">
      <AppSidebar />
      <div className="flex min-h-screen flex-col">
        <TopBar />
        <main className="flex-1 px-6 py-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <h1 className="font-serif text-3xl font-medium text-foreground">
                Activités du Centre
              </h1>
              <p className="text-muted-foreground">
                Ateliers, rencontres, formations et publications du CRK-ICC.
              </p>
            </div>
            <div className="space-y-4">
              {activities.length > 0 ? (
                activities.map((a) => <ActivityCard key={a.id} activity={a} />)
              ) : (
                <p className="text-muted-foreground">
                  Aucune activité programmée pour le moment.
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
