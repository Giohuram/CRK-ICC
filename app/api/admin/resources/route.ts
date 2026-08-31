import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const resources = await prisma.resource.findMany({
      include: { contributor: true, themes: { include: { theme: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ resources });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ resources: [] });
  }
}
