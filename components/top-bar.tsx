"use client";

import { Bell, Bookmark, User, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function TopBar() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (q.trim()) router.push(`/fonds?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <header className="sticky top-0 z-30 grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-border/60 bg-white/80 px-6 backdrop-blur">
      <div />
      <form onSubmit={onSubmit} className="relative hidden w-full max-w-2xl sm:block">
        <input
          type="text"
          placeholder="Rechercher une ressource, un auteur, un mot-clé, une thématique..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="h-10 w-full rounded-full border border-border bg-cream px-4 pl-10 text-sm text-foreground outline-none ring-ring transition focus:border-gold focus:ring-2"
        />
        <svg
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </form>
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="hidden gap-2 text-muted-foreground hover:text-foreground sm:flex"
          render={<Link href="/fonds" />}
        >
          <Bookmark className="h-4 w-4" />
          Mes favoris
        </Button>
        <div className="flex items-center gap-2 pl-2">
          <Avatar className="h-9 w-9 border border-border">
            <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=patience" />
            <AvatarFallback>PI</AvatarFallback>
          </Avatar>
          <div className="hidden text-left leading-tight md:block">
            <div className="text-sm font-medium">Patience Issa</div>
            <div className="text-xs text-muted-foreground">Administratrice</div>
          </div>
          <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
        </div>
      </div>
    </header>
  );
}
