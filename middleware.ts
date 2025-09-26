import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Jika tidak ada token, langsung redirect ke login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Secret key harus di-encode menjadi Uint8Array
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

    // Verifikasi token menggunakan jose
    await jwtVerify(token, secret);

    // Jika verifikasi berhasil, lanjutkan ke halaman yang diminta
    return NextResponse.next();
  } catch (err) {
    // Jika verifikasi gagal (token tidak valid atau expired),
    // redirect kembali ke halaman login
    console.error("Verifikasi JWT Gagal:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};