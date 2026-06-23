import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session || !session.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();
        const { title, excerpt, content, meta_title, meta_description, meta_keywords, category, subcategory, cover_image } = data;

        if (!title || !content || !category || !subcategory) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Auto generate slug
        let baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        let slug = baseSlug;

        const client = await pool.connect();
        try {
            // Check for slug uniqueness
            let isUnique = false;
            let counter = 1;
            while (!isUnique) {
                const slugCheck = await client.query("SELECT id FROM website_blog_submissions WHERE slug = $1", [slug]);
                if (slugCheck.rows.length === 0) {
                    isUnique = true;
                } else {
                    slug = `${baseSlug}-${counter}`;
                    counter++;
                }
            }

            await client.query(`
        INSERT INTO website_blog_submissions (
          user_id, title, excerpt, slug, content, 
          meta_title, meta_description, meta_keywords, 
          category, subcategory, cover_image
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `, [
                session.id, title, excerpt, slug, content,
                meta_title, meta_description, meta_keywords,
                category, subcategory, cover_image
            ]);

            return NextResponse.json({ message: "Blog submitted successfully", slug }, { status: 201 });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("Submission error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
