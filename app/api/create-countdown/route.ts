import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    // console.log("Received form data:", {
    //   senderName: formData.get("senderName"),
    //   recipientName: formData.get("recipientName"),
    //   birthDate: formData.get("birthDate"),
    //   targetAge: formData.get("targetAge"),
    // });

    const senderName = formData.get("senderName");
    const recipientName = formData.get("recipientName");
    const birthDate = new Date(formData.get("birthDate") as string);
    const targetAge = parseInt(formData.get("targetAge") as string);

    if (!senderName || !recipientName || !birthDate || !targetAge) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error: dbError } = await supabase
      .from("birthdays")
      .insert([
        {
          sender_name: senderName,
          recipient_name: recipientName,
          birth_date: birthDate.toISOString(),
          target_age: targetAge,
        },
      ])
      .select()
      .single();

    if (dbError) {
      // console.error("Database insert error:", dbError);
      return NextResponse.json(
        { error: "Database operation failed" },
        { status: 500 }
      );
    }

    // console.log("Successfully created birthday entry:", data);
    return NextResponse.json({ id: data.id });
  } catch (_) {
    // console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
