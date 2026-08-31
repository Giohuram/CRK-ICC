import { NextResponse } from "next/server";
import { getProposedResources } from "@/lib/data";

export async function GET() {
  try {
    const proposals = await getProposedResources();
    return NextResponse.json({ proposals });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ proposals: [] });
  }
}
