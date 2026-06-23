import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
    let client;
    try {
        client = await pool.connect();

        // Create website_users table
        await client.query(`
      CREATE TABLE IF NOT EXISTS website_users (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        // Create website_blog_submissions table
        await client.query(`
      CREATE TABLE IF NOT EXISTS website_blog_submissions (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES website_users(id) ON DELETE CASCADE,
          title TEXT NOT NULL,
          excerpt TEXT,
          slug TEXT UNIQUE NOT NULL,
          content TEXT NOT NULL,
          meta_title TEXT,
          meta_description TEXT,
          meta_keywords TEXT,
          category TEXT NOT NULL,
          subcategory TEXT NOT NULL,
          cover_image TEXT,
          status VARCHAR(20) DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT status_check CHECK (status IN ('pending', 'reviewed', 'rejected'))
      );
    `);

        return NextResponse.json({ message: "Community tables created successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error creating community tables:", error);
        return NextResponse.json({ error: "Failed to create community tables" }, { status: 500 });
    } finally {
        if (client) {
            client.release();
        }
    }
}
