import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";
import { encrypt } from "@/lib/session";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const client = await pool.connect();
        try {
            // Check if user exists
            const existingUser = await client.query(
                "SELECT id FROM website_users WHERE email = $1",
                [email]
            );

            if (existingUser.rows.length > 0) {
                return NextResponse.json({ error: "Email already in use" }, { status: 409 });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user
            const result = await client.query(
                "INSERT INTO website_users(name, email, password) VALUES($1, $2, $3) RETURNING id, name, email",
                [name, email, hashedPassword]
            );

            const user = result.rows[0];

            // Create session
            const session = await encrypt({ id: user.id, name: user.name, email: user.email });

            const cookieStore = await cookies();
            cookieStore.set("community_session", session, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24 // 24 hours
            });

            return NextResponse.json({ message: "Registered successfully", user }, { status: 201 });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
