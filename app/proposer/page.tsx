"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/top-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { FormEvent, useState } from "react";
import { Send, CheckCircle } from "lucide-react";

const documentTypes = [
  "Ouvrage",
  "Article de recherche",
  "Thèse",
  "Rapport",
  "Article de presse",
  "Document institutionnel",
  "Ressource audiovisuelle",
  "Multimédia",
];

const themes = [
  "Patrimoine culturel matériel et immatériel",
  "Arts visuels et design",
  "Musique et industries sonores",
  "Littérature et édition",
  "Spectacle vivant",
  "Cinéma et audiovisuel",
  "Mode, artisanat et créativité",
  "Architecture",
  "Musées, archives et mémoire",
  "Numérique et industries créatives",
  "Politiques culturelles",
  "Économie et financement de la culture",
];

export default function ProposerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/proposer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        toast.success("Votre proposition a été soumise. Elle sera vérifiée avant publication.");
      } else {
        toast.error("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen lg:pl-72">
      <AppSidebar />
      <div className="flex min-h-screen flex-col">
        <TopBar />
        <main className="flex-1 px-6 py-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8">
              <h1 className="font-serif text-3xl font-medium text-foreground">
                Proposer une ressource
              </h1>
              <p className="text-muted-foreground">
                Partagez une référence, un document ou une suggestion. Chaque proposition est vérifiée avant publication.
              </p>
            </div>

            {submitted ? (
              <Card className="border-forest/30 bg-forest/5">
                <CardContent className="flex flex-col items-center py-12 text-center">
                  <CheckCircle className="mb-4 h-14 w-14 text-forest" />
                  <h2 className="mb-2 font-serif text-xl font-medium text-foreground">
                    Proposition soumise
                  </h2>
                  <p className="text-muted-foreground">
                    Merci pour votre contribution. La ressource sera examinée par l'équipe du CRK-ICC avant d'être intégrée au fonds.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-lg">Vos coordonnées</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contributorName">Nom complet *</Label>
                      <Input id="contributorName" name="contributorName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contributorInstitution">Institution / fonction</Label>
                      <Input id="contributorInstitution" name="contributorInstitution" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="email">Adresse e-mail *</Label>
                      <Input id="email" name="email" type="email" required />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-lg">La ressource</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="resourceTitle">Titre de la ressource *</Label>
                      <Input id="resourceTitle" name="resourceTitle" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="author">Auteur(s)</Label>
                      <Input id="author" name="author" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Année</Label>
                      <Input id="year" name="year" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Type de document *</Label>
                      <Select name="type" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir un type" />
                        </SelectTrigger>
                        <SelectContent>
                          {documentTypes.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="theme">Thématique</Label>
                      <Select name="theme">
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir une thématique" />
                        </SelectTrigger>
                        <SelectContent>
                          {themes.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="reference">Référence ou lien</Label>
                      <Input id="reference" name="reference" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="justification">Justification de la pertinence</Label>
                      <Textarea
                        id="justification"
                        name="justification"
                        rows={4}
                        placeholder="Pourquoi cette ressource mérite d'être intégrée au CRK-ICC ?"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full gap-2 rounded-lg bg-plum text-white hover:bg-plum/90"
                >
                  <Send className="h-4 w-4" />
                  {loading ? "Envoi en cours..." : "Soumettre la proposition"}
                </Button>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
