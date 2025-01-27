import BirthdayForm from "@/components/BirthdayForm";

export const metadata = {
  title: "Birthday Countdown | Create Special Moments for Your Loved Ones",
  description:
    "🎈 Create a special birthday countdown for your loved ones. Make them happy with surprise messages and warm wishes! 🎉",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex-1 container mx-auto px-4 py-8">
        <BirthdayForm />
      </main>

      <footer className="w-full py-4 px-6 bg-white/30 dark:bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto flex justify-end items-center text-sm text-gray-600 dark:text-gray-300">
          <a
            href="https://linknots.com/kuralayusha"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            Powered by Kuralayusha
          </a>
        </div>
      </footer>
    </div>
  );
}
