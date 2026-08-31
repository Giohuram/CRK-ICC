"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutGrid,
  Library,
  Users,
  CalendarDays,
  Info,
  PlusCircle,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Lightbulb,
  HeartHandshake,
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const fondsSubmenu = [
  { label: "Toutes les ressources", href: "/fonds" },
  { label: "Ouvrages", href: "/fonds?type=Ouvrage" },
  { label: "Articles de recherche", href: "/fonds?type=Article+de+recherche" },
  { label: "Articles de presse", href: "/fonds?type=Article+de+presse" },
  { label: "Rapports & études", href: "/fonds?type=Rapport" },
  { label: "Thèses & mémoires", href: "/fonds?type=Thèse" },
  { label: "Multimédia", href: "/fonds?type=Ressource+audiovisuelle" },
];

const mainNav = [
  { label: "Accueil", href: "/", icon: Home },
  {
    label: "Fonds documentaire",
    href: "/fonds",
    icon: Library,
    submenu: fondsSubmenu,
  },
  { label: "Thématiques", href: "/thematiques", icon: LayoutGrid },
  { label: "Contributeurs", href: "/contributeurs", icon: Users },
  { label: "Activités du Centre", href: "/activites", icon: CalendarDays },
  { label: "À propos du CRK-ICC", href: "/a-propos", icon: Info },
  { label: "Contribuer au fonds", href: "/proposer", icon: PlusCircle },
  { label: "Aide", href: "/aide", icon: HelpCircle },
];

function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold to-amber-300">
        <Lightbulb className="h-5 w-5 text-plum" />
      </div>
      <div className="leading-tight">
        <div className="text-sm font-semibold tracking-widest text-white">
          CRK-ICC
        </div>
        <div className="text-[10px] uppercase tracking-wide text-white/70">
          Centre de Ressources
          <br />
          Kinshasa - Industries Culturelles & Créatives
        </div>
      </div>
    </div>
  );
}

function NavItem({ item }: { item: (typeof mainNav)[number] }) {
  const pathname = usePathname();
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
  const [open, setOpen] = useState(isActive);
  const Icon = item.icon;

  return (
    <div>
      <Link
        href={item.href}
        onClick={() => item.submenu && setOpen(!open)}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
          isActive
            ? "bg-gold/90 text-plum font-medium"
            : "text-white/90 hover:bg-white/10 hover:text-white"
        )}
      >
        <Icon className="h-4 w-4 shrink-0" />
        <span className="flex-1">{item.label}</span>
        {item.submenu && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setOpen(!open);
            }}
            className="rounded p-1 hover:bg-white/10"
          >
            {open ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
      </Link>
      {item.submenu && open && (
        <div className="mt-1 ml-4 border-l border-white/20 pl-4">
          {item.submenu.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href}
              className={cn(
                "block rounded-lg px-3 py-1.5 text-sm transition-colors",
                pathname === sub.href
                  ? "text-gold font-medium"
                  : "text-white/70 hover:text-white"
              )}
            >
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function SidebarContent() {
  return (
    <div className="flex h-full flex-col bg-plum text-white">
      <div className="p-6">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 px-4 pb-4">
        {mainNav.map((item) => (
          <NavItem key={item.href} item={item} />
        ))}
      </nav>
      <div className="mx-4 mb-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5">
        <div className="mb-2 text-lg font-serif font-medium leading-snug text-white">
          Valoriser.
          <br />
          Partager.
          <br />
          Inspirer.
        </div>
        <p className="mb-4 text-xs leading-relaxed text-white/70">
          Ensemble, bâtissons la ressource et la créativité.
        </p>
        <Link
          href="/proposer"
          className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-semibold text-plum transition hover:bg-amber-300"
        >
          <HeartHandshake className="h-3.5 w-3.5" />
          Contribuer
        </Link>
      </div>
      <div className="px-6 pb-6">
        <div className="mb-3 flex items-center gap-3 text-white/60">
          <a href="#" className="hover:text-gold" aria-label="Facebook">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
          </a>
          <a href="#" className="hover:text-gold" aria-label="Instagram">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" /></svg>
          </a>
          <a href="#" className="hover:text-gold" aria-label="LinkedIn">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
          </a>
          <a href="#" className="hover:text-gold" aria-label="YouTube">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white" /></svg>
          </a>
        </div>
        <div className="text-[10px] text-white/40">
          © CRK-ICC 2026
        </div>
      </div>
    </div>
  );
}

export function AppSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 lg:block">
        <SidebarContent />
      </aside>
      <div className="fixed left-4 top-4 z-50 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                className="border-plum/20 bg-white/80 backdrop-blur"
              />
            }
          >
            <Menu className="h-5 w-5 text-plum" />
            <span className="sr-only">Ouvrir le menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
