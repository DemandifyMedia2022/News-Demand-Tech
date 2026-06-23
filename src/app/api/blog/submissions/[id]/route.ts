import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getSession();
        if (!session || !session.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const client = await pool.connect();
        try {
            const { id } = await params;
            const result = await client.query(`
        SELECT * FROM website_blog_submissions WHERE id = $1 AND user_id = $2
      `, [id, session.id]);

            if (result.rows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

            return NextResponse.json({ submission: result.rows[0] }, { status: 200 });
        } finally {
            client.release();
        }
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getSession();
        if (!session || !session.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const data = await req.json();
        const { title, excerpt, content, meta_title, meta_description, meta_keywords, category, subcategory, cover_image } = data;

        const client = await pool.connect();
        try {
            const { id } = await params;
            // Ensure only pending submissions can be edited
            const check = await client.query("SELECT status FROM website_blog_submissions WHERE id = $1 AND user_id = $2", [id, session.id]);
            if (check.rows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
            if (check.rows[0].status !== "pending") return NextResponse.json({ error: "Can only edit pending submissions" }, { status: 403 });

            // Generate slug again if title changed? Let's just keep the existing slug or user can't change slug.
            // Easiest is to retain slug.
            await client.query(`
        UPDATE website_blog_submissions SET
          title = $1, excerpt = $2, content = $3, 
          meta_title = $4, meta_description = $5, meta_keywords = $6,
          category = $7, subcategory = $8, cover_image = $9
        WHERE id = $10 AND user_id = $11
      `, [
                title, excerpt, content,
                meta_title, meta_description, meta_keywords,
                category, subcategory, cover_image,
                id, session.id
            ]);

            return NextResponse.json({ message: "Updated successfully" }, { status: 200 });
        } finally {
            client.release();
        }
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getSession();
        if (!session || !session.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const client = await pool.connect();
        try {
            const { id } = await params;

            const check = await client.query("SELECT status FROM website_blog_submissions WHERE id = $1 AND user_id = $2", [id, session.id]);
            if (check.rows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

            await client.query("DELETE FROM website_blog_submissions WHERE id = $1 AND user_id = $2", [id, session.id]);

            return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
        } finally {
            client.release();
        }
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
