import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { hashPassword, createSession } from "@/lib/auth-server";

export async function POST(req: NextRequest) {
    try {
        const { fullName, email, password } = await req.json();

        if (!fullName || !email || !password) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Check if user exists
        const userCheck = await pool.query("SELECT * FROM website_users WHERE email = $1", [email]);
        if (userCheck.rows.length > 0) {
            return NextResponse.json({ error: "User already exists with this email" }, { status: 400 });
        }

        // Hash password
        const passwordHash = await hashPassword(password);

        // Insert user
        const result = await pool.query(
            "INSERT INTO website_users (full_name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, full_name, email",
            [fullName, email, passwordHash]
        );

        const newUser = result.rows[0];

        // Create session (JWT cookie)
        await createSession(newUser.id);

        return NextResponse.json({
            success: true,
            user: {
                id: newUser.id,
                fullName: newUser.full_name,
                email: newUser.email,
            },
        });
    } catch (error: any) {
        console.error("Register Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
