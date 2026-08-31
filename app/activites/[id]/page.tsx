import { notFound } from "next/navigation";
import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/top-bar";
import { Badge } from "@/components/ui/badge";
import { getActivityById } from "@/lib/data";
import { ArrowLeft, CalendarDays, MapPin, Video, Users } from "lucide-react";

function formatDate(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

export const metadata = {
  title: "Activité — CRK-ICC",
};

export async function generateStaticParams() {
  return [];
}

export default async function ActivityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const activity = await getActivityById(id);
  if (!activity) notFound();

  return (
    <div className="min-h-screen lg:pl-72">
      <AppSidebar />
      <div className="flex min-h-screen flex-col">
        <TopBar />
        <main className="flex-1 px-6 py-8">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/activites"
              className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Toutes les activités
            </Link>

            <div className="rounded-2xl border border-border bg-white p-8">
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">
                  {activity.type}
                </Badge>
                {activity.isOnline && (
                  <Badge variant="outline" className="text-xs">
                    En ligne
                  </Badge>
                )}
              </div>
              <h1 className="mb-6 font-serif text-3xl font-medium leading-tight text-foreground">
                {activity.title}
              </h1>

              <div className="mb-8 grid gap-4 rounded-xl bg-cream p-5 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-plum/10 text-plum">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Date</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(activity.date)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatTime(activity.date)}
                      {activity.endDate && ` – ${formatTime(activity.endDate)}`}
                    </div>
                  </div>
                </div>
                {activity.location && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest/10 text-forest">
                      {activity.isOnline ? (
                        <Video className="h-5 w-5" />
                      ) : (
                        <MapPin className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">Lieu</div>
                      <div className="text-sm text-muted-foreground">
                        {activity.location}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {activity.description && (
                <div className="mb-8">
                  <h2 className="mb-2 font-serif text-xl font-medium text-foreground">
                    Description
                  </h2>
                  <p className="leading-relaxed text-muted-foreground">
                    {activity.description}
                  </p>
                </div>
              )}

              {activity.partners && (
                <div>
                  <div className="mb-2 flex items-center gap-2 font-serif text-lg font-medium text-foreground">
                    <Users className="h-5 w-5 text-gold" />
                    Partenaires
                  </div>
                  <p className="text-muted-foreground">{activity.partners}</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
