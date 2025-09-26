import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import supabase from "../../lib/supabaseServer";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";


export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username dan password wajib diisi" }, { status: 400 });
    }

    // Cari user
    const { data: user, error } = await supabase
      .from("users")
      .select("id, username, password_hash, real_name, role, is_frozen")
      .eq("username", username)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    if (user.is_frozen) {
      return NextResponse.json({ error: "Akun ini dibekukan ❄️" }, { status: 403 });
    }

    // Cek password
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return NextResponse.json({ error: "Password salah" }, { status: 401 });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, role: user.role, real_name: user.real_name },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return NextResponse.json({ token, user: { id: user.id, real_name: user.real_name, role: user.role } });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
