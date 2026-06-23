import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { verifyPassword, createSession } from "@/lib/auth-server";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Find user
        const result = await pool.query("SELECT * FROM website_users WHERE email = $1", [email]);
        const user = result.rows[0];

        if (!user) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        // Verify password
        const passwordMatch = await verifyPassword(password, user.password_hash);
        if (!passwordMatch) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        // Update last login
        await pool.query("UPDATE website_users SET last_login_at = NOW() WHERE id = $1", [user.id]);

        // Create session (JWT cookie)
        await createSession(user.id);

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                fullName: user.full_name,
                email: user.email,
            },
        });
    } catch (error: any) {
        console.error("Login Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
