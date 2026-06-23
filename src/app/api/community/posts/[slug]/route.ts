import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    const client = await pool.connect();
    try {
        const { slug } = await params;
        const result = await client.query(`
      SELECT b.id, b.title, b.content, b.excerpt, b.slug, b.cover_image, b.category, 
             b.subcategory, b.created_at, b.meta_title, b.meta_description, b.meta_keywords, 
             u.name as author_name
      FROM website_blog_submissions b
      JOIN website_users u ON b.user_id = u.id
      WHERE b.status = 'reviewed' AND b.slug = $1
    `, [slug]);

        if (result.rows.length === 0) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ post: result.rows[0] }, { status: 200 });
    } catch (error) {
        console.error("Fetch community post error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    } finally {
        client.release();
    }
}
