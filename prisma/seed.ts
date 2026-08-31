import { prisma } from "../lib/prisma";
import {
  themes,
  contributors,
  resources,
  activities,
  dossiers,
} from "./seed-data";

async function main() {
  console.log("🌱 Démarrage du seed CRK-ICC...");

  await prisma.keyword.deleteMany();
  await prisma.resourceTheme.deleteMany();
  await prisma.dossierResource.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.theme.deleteMany();
  await prisma.contributor.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.dossier.deleteMany();
  await prisma.proposedResource.deleteMany();

  await prisma.theme.createMany({
    data: themes.map((t) => ({ ...t })),
    skipDuplicates: true,
  });
  console.log(`✅ ${themes.length} thématiques créées`);

  for (const c of contributors) {
    await prisma.contributor.upsert({
      where: { id: c.id },
      create: c,
      update: c,
    });
  }
  console.log(`✅ ${contributors.length} contributeurs créés`);

  for (const r of resources) {
    const { themeSlugs, keywordNames, createdAt, ...resourceData } = r;
    const resource = await prisma.resource.create({
      data: {
        ...resourceData,
        createdAt: new Date(createdAt),
        themes: {
          create: themeSlugs.map((slug) => ({
            theme: { connect: { slug } },
          })),
        },
        keywords: {
          connectOrCreate: keywordNames.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
    });
    console.log(`  📚 Ressource créée : ${resource.title.slice(0, 50)}...`);
  }

  await prisma.activity.createMany({
    data: activities,
  });
  console.log(`✅ ${activities.length} activités créées`);

  for (const d of dossiers) {
    const resourceRecords = await prisma.resource.findMany({
      where: { id: { in: d.resourceIds } },
    });
    await prisma.dossier.create({
      data: {
        id: d.id,
        title: d.title,
        slug: d.slug,
        description: d.description ?? "",
        coverUrl: d.coverUrl ?? "",
        resources: {
          create: resourceRecords.map((r) => ({ resourceId: r.id })),
        },
      },
    });
  }
  console.log(`✅ ${dossiers.length} dossier(s) créé(s)`);

  console.log("🌳 Seed terminé.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
