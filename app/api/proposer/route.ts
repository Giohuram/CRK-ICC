import { NextResponse } from "next/server";
import { submitProposedResource } from "@/lib/data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const record = await submitProposedResource({
      contributorName: body.contributorName || "",
      contributorInstitution: body.contributorInstitution || "",
      email: body.email || "",
      resourceTitle: body.resourceTitle || "",
      author: body.author || "",
      year: body.year || "",
      type: body.type || "",
      reference: body.reference || "",
      theme: body.theme || "",
      justification: body.justification || "",
    });
    return NextResponse.json({ success: true, record });
  } catch (error) {
    console.error("Proposition error:", error);
    return NextResponse.json(
      { success: false, error: "Submission failed" },
      { status: 500 }
    );
  }
}
