import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-server";

// { params: { month: string } }
// { params } : { params: Promise<{ month: string }> }
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { error } = await supabase
      .from("birthdays")
      .update({ is_expired: true })
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating expiration:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}
