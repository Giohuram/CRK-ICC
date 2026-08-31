import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/top-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Target, Users, Lightbulb, Handshake } from "lucide-react";

export const metadata = {
  title: "À propos du CRK-ICC — CRK-ICC",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen lg:pl-72">
      <AppSidebar />
      <div className="flex min-h-screen flex-col">
        <TopBar />
        <main className="flex-1 px-6 py-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <h1 className="font-serif text-3xl font-medium text-foreground">
                À propos du CRK-ICC
              </h1>
              <p className="text-muted-foreground">
                Centre de Ressources sur les Industries Culturelles et Créatives.
              </p>
            </div>

            <div className="mb-8 space-y-4 text-foreground">
              <p>
                Le <strong>CRK-ICC</strong> (Centre de Ressources Kinshasa - Industries Culturelles et Créatives) est une initiative de <strong>LAZIIR Group SAS</strong> et de <strong>K-Fé Kultur</strong>. Il vise à rassembler, organiser et valoriser les ressources documentaires consacrées à la culture, au patrimoine et aux industries culturelles et créatives en République démocratique du Congo et en Afrique centrale.
              </p>
              <p>
                Conçu comme un outil évolutif, le CRK-ICC précède la création d'une antenne physique. Il offre déjà aux chercheurs, artistes, professionnels et institutions un point d'accès centralisé aux références, études, rapports et archives disponibles sur ces sujets.
              </p>
            </div>

            <div className="mb-8 grid gap-5 sm:grid-cols-2">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 font-serif text-base">
                    <Target className="h-5 w-5 text-gold" />
                    Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Rendre accessibles, organiser et valoriser les ressources documentaires consacrées aux ICC, au patrimoine et à la culture.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 font-serif text-base">
                    <Lightbulb className="h-5 w-5 text-gold" />
                    Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Devenir un véritable centre de ressources et de documentation numérique au service de la recherche, de la création et des politiques culturelles.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 font-serif text-base">
                    <Users className="h-5 w-5 text-gold" />
                    Publics concernés
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Chercheurs, enseignants, étudiants, artistes, créateurs, opérateurs culturels, journalistes et partenaires institutionnels.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 font-serif text-base">
                    <Handshake className="h-5 w-5 text-gold" />
                    Axes d'intervention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Documentation, recherche, revue de littérature, animation d'ateliers, mise en réseau et appui aux politiques culturelles.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mb-8 rounded-2xl border border-border bg-white p-8">
              <h2 className="mb-4 font-serif text-2xl font-medium text-foreground">
                K-Fé Kultur & LAZIIR Group
              </h2>
              <p className="mb-4 text-muted-foreground">
                <strong>K-Fé Kultur</strong> est une structure dédiée à la promotion et à l'accompagnement des acteurs culturels et créatifs. <strong>LAZIIR Group SAS</strong> accompagne les projets à fort impact culturel, social et économique en RDC et en Afrique centrale.
              </p>
              <p className="text-muted-foreground">
                Le CRK-ICC est développé en collaboration avec des chercheurs, des institutions et des professionnels des ICC qui contribuent progressivement au fonds documentaire.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/fonds"
                className="inline-flex items-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-medium text-white transition hover:bg-plum/90"
              >
                <BookOpen className="h-4 w-4" />
                Explorer le fonds
              </Link>
              <Link
                href="/proposer"
                className="inline-flex items-center gap-2 rounded-full border border-gold px-6 py-3 text-sm font-medium text-foreground transition hover:bg-gold/10"
              >
                Proposer une ressource
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
