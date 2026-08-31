"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

export function FondsFilter({
  types,
  themes,
  languages,
  countries,
}: {
  types: string[];
  themes: { slug: string; name: string }[];
  languages: string[];
  countries: string[];
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [type, setType] = useState(params.get("type") || "all");
  const [theme, setTheme] = useState(params.get("theme") || "all");
  const [language, setLanguage] = useState(params.get("language") || "all");
  const [country, setCountry] = useState(params.get("country") || "all");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const search = new URLSearchParams();
    if (query.trim()) search.set("q", query.trim());
    if (type !== "all") search.set("type", type);
    if (theme !== "all") search.set("theme", theme);
    if (language !== "all") search.set("language", language);
    if (country !== "all") search.set("country", country);
    router.push(`/fonds?${search.toString()}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mb-6 flex flex-col gap-4 rounded-2xl border border-border bg-white p-4 lg:flex-row lg:items-end"
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher par titre, auteur, mot-clé ou thématique..."
          className="h-11 rounded-lg border-border bg-cream pl-9"
        />
      </div>
      <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Select value={type} onValueChange={(v) => setType(v ?? "all")}>
          <SelectTrigger className="h-11 bg-cream">
            <SelectValue placeholder="Type de document" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            {types.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={theme} onValueChange={(v) => setTheme(v ?? "all")}>
          <SelectTrigger className="h-11 bg-cream">
            <SelectValue placeholder="Thématique" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les thématiques</SelectItem>
            {themes.map((t) => (
              <SelectItem key={t.slug} value={t.slug}>
                {t.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={language} onValueChange={(v) => setLanguage(v ?? "all")}>
          <SelectTrigger className="h-11 bg-cream">
            <SelectValue placeholder="Langue" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les langues</SelectItem>
            {languages.map((l) => (
              <SelectItem key={l} value={l}>
                {l}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={country} onValueChange={(v) => setCountry(v ?? "all")}>
          <SelectTrigger className="h-11 bg-cream">
            <SelectValue placeholder="Zone géographique" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les zones</SelectItem>
            {countries.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <button
        type="submit"
        className="inline-flex h-11 items-center gap-2 rounded-lg bg-plum px-5 text-sm font-medium text-white transition hover:bg-plum/90"
      >
        <Filter className="h-4 w-4" />
        Filtrer
      </button>
    </form>
  );
}
