import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
    const client = await pool.connect();
    try {
        const result = await client.query(`
      SELECT b.id, b.title, b.excerpt, b.slug, b.cover_image, b.category, b.created_at, u.name as author_name
      FROM website_blog_submissions b
      JOIN website_users u ON b.user_id = u.id
      WHERE b.status = 'reviewed'
      ORDER BY b.created_at DESC
    `);

        return NextResponse.json({ posts: result.rows }, { status: 200 });
    } catch (error) {
        console.error("Fetch community posts error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    } finally {
        client.release();
    }
}
