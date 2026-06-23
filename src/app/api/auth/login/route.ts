import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";
import { encrypt } from "@/lib/session";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
        }

        const client = await pool.connect();
        try {
            // Find user
            const result = await client.query(
                "SELECT id, name, email, password FROM website_users WHERE email = $1",
                [email]
            );

            if (result.rows.length === 0) {
                return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
            }

            const user = result.rows[0];

            // Compare password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
            }

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

            return NextResponse.json({ message: "Logged in successfully", user: { id: user.id, name: user.name, email: user.email } }, { status: 200 });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
