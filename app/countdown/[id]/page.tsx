import { createClient } from "@supabase/supabase-js";
import CountdownDisplay from "@/components/CountdownDisplay";
import { notFound } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

async function getBirthday(id: string) {
  console.log("Fetching birthday with ID:", id);

  const { data: birthday, error } = await supabase
    .from("birthdays")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Supabase error:", error);
    return null;
  }

  console.log("Birthday data:", birthday);
  return birthday;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const birthday = await getBirthday(params.id);

  return {
    title: birthday ? `Countdown for ${birthday.recipient_name}` : "Not Found",
  };
}

export default async function CountdownPage({
  params,
}: {
  params: { id: string };
}) {
  const birthday = await getBirthday(params.id);

  if (!birthday) {
    console.error("Birthday not found for ID:", params.id);
    notFound();
  }

  console.log("Rendering countdown for:", {
    recipient: birthday.recipient_name,
    date: birthday.birth_date,
    hasImage: !!birthday.image_url,
  });

  const birthdayData = {
    recipient_name: birthday.recipient_name,
    birth_date: birthday.birth_date,
    celebration_date: birthday.celebration_date,
    target_age: birthday.target_age,
    image_url: birthday.image_url,
    sender_name: birthday.sender_name,
    id: birthday.id,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex-1 container mx-auto px-4 py-8">
        <CountdownDisplay birthday={birthdayData} />
      </main>

      <footer className="w-full py-4 px-6 bg-white/30 dark:bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
          <span>Created by {birthday.sender_name}</span>
          <a
            href="https://linknots.com/kuralayusha"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            Powered by Yusha
          </a>
        </div>
      </footer>
    </div>
  );
}
