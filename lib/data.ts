import { prisma } from "./prisma";
import {
  themes as mockThemes,
  contributors as mockContributors,
  resources as mockResources,
  activities as mockActivities,
  dossiers as mockDossiers,
  stats as mockStats,
} from "../prisma/seed-data";

const useDatabase = () =>
  !!process.env.DATABASE_URL &&
  !process.env.DATABASE_URL.startsWith("file:");

// --- Types helpers ---------------------------------------------------------

export type ResourceWithRelations = Awaited<
  ReturnType<typeof getResourceById>
>;

// --- Stats -----------------------------------------------------------------

export async function getStats() {
  if (useDatabase()) {
    const [
      resourcesCount,
      contributorsCount,
      themesCount,
      activitiesCount,
    ] = await Promise.all([
      prisma.resource.count({ where: { status: "PUBLISHED" } }),
      prisma.contributor.count(),
      prisma.theme.count(),
      prisma.activity.count(),
    ]);
    return { resourcesCount, contributorsCount, themesCount, activitiesCount };
  }
  return mockStats;
}

// --- Themes ----------------------------------------------------------------

export async function getThemes() {
  if (useDatabase()) {
    const themes = await prisma.theme.findMany({
      include: {
        resources: { where: { resource: { status: "PUBLISHED" } } },
      },
      orderBy: { name: "asc" },
    });
    return themes.map((t) => ({
      ...t,
      resourcesCount: t.resources.length,
    }));
  }
  return mockThemes.map((t) => ({
    ...t,
    resourcesCount: mockResources.filter((r) =>
      r.themeSlugs.includes(t.slug)
    ).length,
  }));
}

export async function getThemeBySlug(slug: string) {
  if (useDatabase()) {
    return prisma.theme.findUnique({
      where: { slug },
      include: { resources: { include: { resource: true } } },
    });
  }
  const theme = mockThemes.find((t) => t.slug === slug) ?? null;
  if (!theme) return null;
  return {
    ...theme,
    resources: mockResources
      .filter((r) => r.themeSlugs.includes(slug))
      .map(enrichMockResource),
  };
}

// --- Contributors -----------------------------------------------------------

export async function getContributors() {
  if (useDatabase()) {
    return prisma.contributor.findMany({
      include: { resources: { where: { status: "PUBLISHED" } } },
      orderBy: { name: "asc" },
    });
  }
  return mockContributors.map((c) => ({
    ...c,
    resources: mockResources.filter((r) => r.contributorId === c.id),
  }));
}

export async function getContributorById(id: string) {
  if (useDatabase()) {
    return prisma.contributor.findUnique({
      where: { id },
      include: { resources: { include: { themes: { include: { theme: true } } } } },
    });
  }
  const contributor = mockContributors.find((c) => c.id === id) ?? null;
  if (!contributor) return null;
  return {
    ...contributor,
    resources: mockResources
      .filter((r) => r.contributorId === id)
      .map(enrichMockResource),
  };
}

// --- Resources --------------------------------------------------------------

function enrichMockResource(resource: (typeof mockResources)[number]) {
  const contributor =
    mockContributors.find((c) => c.id === resource.contributorId) ?? null;
  const themeObjects = mockThemes.filter((t) =>
    resource.themeSlugs.includes(t.slug)
  );
  const keywordObjects = resource.keywordNames.map((name) => ({ id: name, name }));
  return {
    ...resource,
    createdAt: new Date(resource.createdAt),
    updatedAt: new Date(resource.createdAt),
    contributor,
    themes: themeObjects.map((t) => ({ theme: t })),
    keywords: keywordObjects,
    dossiers: [],
  };
}

export async function getResources(filters?: {
  query?: string;
  type?: string;
  themeSlug?: string;
  author?: string;
  language?: string;
  country?: string;
}) {
  if (useDatabase()) {
    const where: any = { status: "PUBLISHED" };
    if (filters?.type) where.type = filters.type;
    if (filters?.themeSlug) {
      where.themes = { some: { theme: { slug: filters.themeSlug } } };
    }
    if (filters?.language) where.language = filters.language;
    if (filters?.country) where.country = filters.country;
    if (filters?.query) {
      const q = filters.query;
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { authors: { contains: q, mode: "insensitive" } },
        { keywords: { some: { name: { contains: q, mode: "insensitive" } } } },
        { themes: { some: { theme: { name: { contains: q, mode: "insensitive" } } } } },
      ];
    }
    if (filters?.author) {
      where.authors = { contains: filters.author, mode: "insensitive" };
    }
    return prisma.resource.findMany({
      where,
      include: {
        contributor: true,
        themes: { include: { theme: true } },
        keywords: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  let result = mockResources.filter((r) => r.status === "PUBLISHED");
  if (filters?.type) result = result.filter((r) => r.type === filters.type);
  if (filters?.themeSlug)
    result = result.filter((r) => r.themeSlugs.includes(filters.themeSlug!));
  if (filters?.language)
    result = result.filter((r) => r.language === filters.language);
  if (filters?.country)
    result = result.filter((r) => r.country === filters.country);
  if (filters?.author)
    result = result.filter((r) =>
      r.authors.toLowerCase().includes(filters.author!.toLowerCase())
    );
  if (filters?.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.authors.toLowerCase().includes(q) ||
        r.keywordNames.some((k) => k.toLowerCase().includes(q)) ||
        r.themeSlugs.some((slug) => {
          const t = mockThemes.find((x) => x.slug === slug);
          return t?.name.toLowerCase().includes(q);
        })
    );
  }
  return result.map(enrichMockResource);
}

export async function getResourceById(id: string) {
  if (useDatabase()) {
    return prisma.resource.findUnique({
      where: { id },
      include: {
        contributor: true,
        themes: { include: { theme: true } },
        keywords: true,
        dossiers: { include: { dossier: true } },
      },
    });
  }
  const resource = mockResources.find((r) => r.id === id) ?? null;
  if (!resource) return null;
  return enrichMockResource(resource);
}

// --- Activities -------------------------------------------------------------

export async function getActivities() {
  if (useDatabase()) {
    return prisma.activity.findMany({ orderBy: { date: "asc" } });
  }
  return mockActivities.map((a) => ({ ...a, date: new Date(a.date), endDate: a.endDate ? new Date(a.endDate) : null }));
}

export async function getActivityById(id: string) {
  if (useDatabase()) {
    return prisma.activity.findUnique({ where: { id } });
  }
  const a = mockActivities.find((x) => x.id === id) ?? null;
  if (!a) return null;
  return { ...a, date: new Date(a.date), endDate: a.endDate ? new Date(a.endDate) : null };
}

// --- Dossiers ---------------------------------------------------------------

export async function getDossiers() {
  if (useDatabase()) {
    return prisma.dossier.findMany({
      include: { resources: { include: { resource: true } } },
      orderBy: { title: "asc" },
    });
  }
  return mockDossiers.map((d) => ({
    ...d,
    description: d.description ?? "",
    resources: d.resourceIds
      .map((id) => mockResources.find((r) => r.id === id))
      .filter(Boolean)
      .map((r) => enrichMockResource(r!)),
  }));
}

export async function getDossierBySlug(slug: string) {
  if (useDatabase()) {
    return prisma.dossier.findUnique({
      where: { slug },
      include: {
        resources: {
          include: {
            resource: {
              include: {
                contributor: true,
                themes: { include: { theme: true } },
                keywords: true,
              },
            },
          },
        },
      },
    });
  }
  const dossier = mockDossiers.find((d) => d.slug === slug) ?? null;
  if (!dossier) return null;
  return {
    ...dossier,
    description: dossier.description ?? "",
    resources: dossier.resourceIds
      .map((id) => mockResources.find((r) => r.id === id))
      .filter(Boolean)
      .map((r) => enrichMockResource(r!)),
  };
}

// --- Proposals --------------------------------------------------------------

export type ProposedResourceInput = {
  contributorName: string;
  contributorInstitution?: string;
  email: string;
  resourceTitle: string;
  author?: string;
  year?: string;
  type: string;
  reference?: string;
  theme?: string;
  justification?: string;
};

export async function submitProposedResource(data: ProposedResourceInput) {
  if (useDatabase()) {
    return prisma.proposedResource.create({
      data: {
        ...data,
        status: "SUBMITTED",
      },
    });
  }
  return { ...data, id: `mock-${Date.now()}`, status: "SUBMITTED", createdAt: new Date() };
}

export async function getProposedResources() {
  if (useDatabase()) {
    return prisma.proposedResource.findMany({ orderBy: { createdAt: "desc" } });
  }
  return [];
}

export async function updateProposedResourceStatus(id: string, status: string) {
  if (useDatabase()) {
    return prisma.proposedResource.update({ where: { id }, data: { status } });
  }
  return { id, status };
}

// --- Resource types / filters -----------------------------------------------

export async function getResourceTypes() {
  if (useDatabase()) {
    const resources = await prisma.resource.findMany({ where: { status: "PUBLISHED" }, select: { type: true } });
    return Array.from(new Set(resources.map((r) => r.type)));
  }
  return Array.from(new Set(mockResources.map((r) => r.type)));
}

export async function getResourceLanguages() {
  if (useDatabase()) {
    const resources = await prisma.resource.findMany({ where: { status: "PUBLISHED" }, select: { language: true } });
    return Array.from(new Set(resources.map((r) => r.language).filter(Boolean)));
  }
  return Array.from(new Set(mockResources.map((r) => r.language).filter(Boolean)));
}

export async function getResourceCountries() {
  if (useDatabase()) {
    const resources = await prisma.resource.findMany({ where: { status: "PUBLISHED" }, select: { country: true } });
    return Array.from(new Set(resources.map((r) => r.country).filter(Boolean)));
  }
  return Array.from(new Set(mockResources.map((r) => r.country).filter(Boolean)));
}
