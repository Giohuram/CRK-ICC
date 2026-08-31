import { cn } from "@/lib/utils";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  landmark: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="4" />
      <path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
      <path d="M12 11v2" />
    </svg>
  ),
  palette: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M12 16a4 4 0 0 0 0-8 4 4 0 0 0 0 8z" />
      <path d="M15.5 8.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0z" />
      <path d="M17 12a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0z" />
      <path d="M15.5 15.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0z" />
    </svg>
  ),
  music: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-3v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  "book-open": ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  theater: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 5.5c1.5-1.5 5-1.5 6 0" />
      <path d="M16 5.5c1.5-1.5 5-1.5 6 0" />
      <path d="M4 22c0-2 1-4 4-4 2 0 4 1 6 2 2-1 4-2 6-2 3 0 4 2 4 4" />
      <path d="M12 11v5" />
    </svg>
  ),
  film: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2.18" />
      <path d="M7 2v20" />
      <path d="M17 2v20" />
      <path d="M2 12h20" />
      <path d="M2 7h5" />
      <path d="M2 17h5" />
      <path d="M17 17h5" />
      <path d="M17 7h5" />
    </svg>
  ),
  scissors: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3" />
      <path d="M8.12 8.12 12 12" />
      <path d="M20 4 8.12 15.88" />
      <circle cx="6" cy="18" r="3" />
      <path d="M14.8 14.8 20 20" />
    </svg>
  ),
  "building-2": ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 21h4" />
      <path d="M12 21v-8" />
      <path d="M6 21v-8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8" />
      <path d="M6 11V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" />
      <path d="M9 5V3" />
      <path d="M15 5V3" />
    </svg>
  ),
  archive: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h16a2 2 0 0 0 2-2V8.5L14.5 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6" />
    </svg>
  ),
  cpu: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
    </svg>
  ),
  "scroll-text": ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21h12a2 2 0 0 0 2-2v-2H8v2a2 2 0 1 1-4 0V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2" />
      <path d="M8 7h12" />
      <path d="M8 11h12" />
      <path d="M8 15h12" />
    </svg>
  ),
  banknote: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M7 12h.01" />
      <path d="M17 12h.01" />
    </svg>
  ),
};

const defaultColors: Record<string, string> = {
  patrimoine: "#4F7C5B",
  "arts-visuels": "#D97757",
  musique: "#D4A441",
  litterature: "#3B6FB6",
  spectacle: "#C95B8B",
  cinema: "#2B8A8A",
  "mode-artisanat": "#D4A441",
  architecture: "#8B7355",
  "musees-archives": "#7B4F9B",
  numerique: "#2B8A8A",
  "politiques-culturelles": "#4F7C5B",
  "economie-culture": "#D4A441",
};

export function ThemeIcon({
  icon,
  color,
  className,
  size = "md",
}: {
  icon: string;
  color?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const Icon = iconMap[icon] ?? iconMap.landmark;
  const c = color || defaultColors[icon] || "#2d1b4e";
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-20 w-20",
  };
  const iconSizes = {
    sm: "h-5 w-5",
    md: "h-7 w-7",
    lg: "h-9 w-9",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full shadow-sm",
        sizeClasses[size],
        className
      )}
      style={{ backgroundColor: `${c}20`, color: c }}
    >
      <Icon className={iconSizes[size]} />
    </div>
  );
}
