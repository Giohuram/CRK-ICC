"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/top-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Lock, CheckCircle, XCircle, Eye } from "lucide-react";

type Proposal = {
  id: string;
  contributorName: string;
  contributorInstitution: string | null;
  email: string;
  resourceTitle: string;
  author: string | null;
  year: string | null;
  type: string;
  reference: string | null;
  theme: string | null;
  justification: string | null;
  status: string;
  createdAt: string;
};

type Resource = {
  id: string;
  title: string;
  authors: string;
  type: string;
  status: string;
  contributor: { name: string } | null;
  themes: { theme: { name: string } }[];
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authenticated) return;
    fetchData();
  }, [authenticated]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [p, r] = await Promise.all([
        fetch("/api/admin/proposed").then((res) => res.json()),
        fetch("/api/admin/resources").then((res) => res.json()),
      ]);
      setProposals(p.proposals || []);
      setResources(r.resources || []);
    } catch {
      toast.error("Impossible de charger les données d'administration.");
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ password }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      setAuthenticated(true);
    } else {
      toast.error("Mot de passe incorrect.");
    }
  };

  const updateProposalStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/admin/proposed/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
        headers: { "Content-Type": "application/json" },
      });
      setProposals((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status } : p))
      );
      toast.success("Statut mis à jour.");
    } catch {
      toast.error("Erreur lors de la mise à jour.");
    }
  };

  const updateResourceStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/admin/resources/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
        headers: { "Content-Type": "application/json" },
      });
      setResources((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
      toast.success("Statut mis à jour.");
    } catch {
      toast.error("Erreur lors de la mise à jour.");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen lg:pl-72">
        <AppSidebar />
        <div className="flex min-h-screen flex-col">
          <TopBar />
          <main className="flex flex-1 items-center justify-center px-6">
            <div className="w-full max-w-md rounded-2xl border border-border bg-white p-8">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-plum/10 text-plum">
                  <Lock className="h-8 w-8" />
                </div>
              </div>
              <h1 className="mb-2 text-center font-serif text-2xl font-medium text-foreground">
                Espace administrateur
              </h1>
              <p className="mb-6 text-center text-sm text-muted-foreground">
                Cet espace est réservé à l'équipe CRK-ICC.
              </p>
              <div className="space-y-4">
                <Input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && login()}
                />
                <Button
                  onClick={login}
                  className="w-full rounded-lg bg-plum text-white hover:bg-plum/90"
                >
                  Se connecter
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:pl-72">
      <AppSidebar />
      <div className="flex min-h-screen flex-col">
        <TopBar />
        <main className="flex-1 px-6 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="font-serif text-3xl font-medium text-foreground">
                  Administration CRK-ICC
                </h1>
                <p className="text-muted-foreground">
                  Gérez les ressources et les propositions reçues.
                </p>
              </div>
              <Button onClick={fetchData} variant="outline" disabled={loading}>
                {loading ? "Chargement..." : "Actualiser"}
              </Button>
            </div>

            <div className="mb-8 rounded-2xl border border-border bg-white p-6">
              <h2 className="mb-4 font-serif text-xl font-medium text-foreground">
                Propositions reçues
              </h2>
              {proposals.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Aucune proposition pour le moment. En mode démo sans base de données, les propositions ne sont pas persistées.
                </p>
              ) : (
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Titre</TableHead>
                        <TableHead>Auteur</TableHead>
                        <TableHead>Proposé par</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {proposals.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell className="font-medium">{p.resourceTitle}</TableCell>
                          <TableCell>{p.author || "—"}</TableCell>
                          <TableCell>{p.contributorName}</TableCell>
                          <TableCell>
                            {new Date(p.createdAt).toLocaleDateString("fr-FR")}
                          </TableCell>
                          <TableCell>
                            <Badge variant={p.status === "PUBLISHED" ? "default" : "secondary"}>
                              {p.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={p.status}
                              onValueChange={(v) => v && updateProposalStatus(p.id, v)}
                            >
                              <SelectTrigger className="w-36">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="SUBMITTED">Soumise</SelectItem>
                                <SelectItem value="REVIEW">En vérification</SelectItem>
                                <SelectItem value="VALIDATED">Validée</SelectItem>
                                <SelectItem value="PUBLISHED">Publiée</SelectItem>
                                <SelectItem value="REJECTED">Rejetée</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-border bg-white p-6">
              <h2 className="mb-4 font-serif text-xl font-medium text-foreground">
                Ressources du fonds
              </h2>
              {resources.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Aucune ressource dans la base de données connectée.
                </p>
              ) : (
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Titre</TableHead>
                        <TableHead>Auteur</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Contributeur</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {resources.map((r) => (
                        <TableRow key={r.id}>
                          <TableCell className="font-medium">{r.title}</TableCell>
                          <TableCell>{r.authors}</TableCell>
                          <TableCell>{r.type}</TableCell>
                          <TableCell>{r.contributor?.name || "—"}</TableCell>
                          <TableCell>
                            <Badge variant={r.status === "PUBLISHED" ? "default" : "secondary"}>
                              {r.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Select
                                value={r.status}
                                onValueChange={(v) => v && updateResourceStatus(r.id, v)}
                              >
                                <SelectTrigger className="w-36">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="PUBLISHED">Publiée</SelectItem>
                                  <SelectItem value="DRAFT">Brouillon</SelectItem>
                                  <SelectItem value="ARCHIVED">Archivée</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
