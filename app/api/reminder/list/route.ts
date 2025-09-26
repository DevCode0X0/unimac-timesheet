// /app/api/reminder/list/route.ts

import supabase from "../../../lib/supabaseClient";


export async function GET(req: Request) {
  // Ambil semua data dari tabel reminders
  const { data, error } = await supabase
    .from("reminders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
