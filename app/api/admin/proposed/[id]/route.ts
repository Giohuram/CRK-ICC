import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const updated = await prisma.proposedResource.update({
      where: { id },
      data: { status: body.status },
    });
    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Update failed" },
      { status: 500 }
    );
  }
}
