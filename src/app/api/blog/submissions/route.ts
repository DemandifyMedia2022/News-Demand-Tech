import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET() {
    try {
        const session = await getSession();
        if (!session || !session.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const client = await pool.connect();
        try {
            const result = await client.query(`
        SELECT id, title, category, status, created_at, slug
        FROM website_blog_submissions
        WHERE user_id = $1
        ORDER BY created_at DESC
      `, [session.id]);

            return NextResponse.json({ submissions: result.rows }, { status: 200 });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("Fetch submissions error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
