import { getModelUsage } from "@/lib/analytics";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const model = searchParams.get("model") ?? "Ford";
    const data = await getModelUsage(model);
    return NextResponse.json({ data });
};