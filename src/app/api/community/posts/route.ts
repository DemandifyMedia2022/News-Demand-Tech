import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryName = searchParams.get("category");
        const sort = searchParams.get("sort") || "latest";
        const query = searchParams.get("q");

        let sql = `
      SELECT 
        p.id,
        p.title,
        p.slug,
        p.excerpt,
        p.featured_image_url as image,
        p.status,
        p.featured,
        p.view_count as views,
        p.like_count as likes,
        p.comment_count as comments,
        p.published_at as date,
        u.first_name || ' ' || u.last_name as author,
        u.username as "authorSlug",
        c.name as category
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.status = 'published'
    `;

        const values: any[] = [];

        if (categoryName && categoryName !== "All") {
            values.push(categoryName);
            sql += ` AND c.name = $${values.length}`;
        }

        if (query) {
            values.push(`%${query}%`);
            sql += ` AND (p.title ILIKE $${values.length} OR p.excerpt ILIKE $${values.length} OR p.content ILIKE $${values.length})`;
        }

        if (sort === "popular") {
            sql += ` ORDER BY p.view_count DESC`;
        } else if (sort === "trending") {
            sql += ` ORDER BY (p.view_count + p.like_count * 2) DESC`;
        } else {
            sql += ` ORDER BY p.published_at DESC`;
        }

        const result = await pool.query(sql, values);

        return NextResponse.json({
            success: true,
            posts: result.rows.map(row => ({
                ...row,
                readTime: "5 min read", // Mock for now
            }))
        });

    } catch (error) {
        console.error("Community posts API error:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
