import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

const sql = await postgres("postgres://postgres.humibareakmxmkxamret:uk2mXs9sLti4BMhr@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x"!, { ssl: 'require' });

export const POST = async (req: NextRequest) => {
    const { fullname, email, phone, dob, password } = await req.json();

    const user = await sql`
        INSERT INTO users (full_name, email, phone_number, dob, password)
        VALUES (${fullname}, ${email}, ${phone}, ${dob}, ${password})
        RETURNING id, full_name, email, phone_number, dob;
    `;

    return NextResponse.json({ user });
}

