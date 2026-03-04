import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    // Check session in cookies or headers
    // For development, return a mock user so the studio editor is accessible
    return NextResponse.json({
        success: true,
        user: {
            name: "Innovation Pioneer",
            email: "pioneer@demandify.com",
            role: "Contributor"
        }
    }, { status: 200 });
}
