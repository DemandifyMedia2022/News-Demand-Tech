import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth-server";
import { pool } from "@/lib/db";

export async function GET(req: NextRequest) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    try {
        const result = await pool.query("SELECT id, full_name, email FROM website_users WHERE id = $1", [session.userId]);
        const user = result.rows[0];

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                fullName: user.full_name,
                email: user.email,
            },
        }, { status: 200 });
    } catch (error) {
        console.error("Auth Me Error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
