// app/api/checkin/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // penting untuk jsonwebtoken, supabase, dll

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_id, location, photo_url } = body;

    if (!user_id || !location) {
      return NextResponse.json(
        { error: "user_id dan location wajib diisi" },
        { status: 400 }
      );
    }

    // sementara dummy simpan (nanti diganti Supabase insert)
    return NextResponse.json({
      success: true,
      message: "Check-in berhasil",
      data: { user_id, location, photo_url, time: new Date().toISOString() },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
