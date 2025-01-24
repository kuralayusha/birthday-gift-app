"use client";

import { useEffect, useState } from "react";

type Birthday = {
  recipient_name: string;
  birth_date: string;
  target_age: number;
  sender_name: string;
  id: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
};

export default function CountdownDisplay({ birthday }: { birthday: Birthday }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetDate = new Date(birthday.birth_date);

      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        };
      }

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        isExpired: false,
      };
    };

    setTimeLeft(calculateTimeLeft());
    setIsLoading(false);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [birthday]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
      <div className="text-center w-full max-w-2xl px-4">
        {timeLeft.isExpired ? (
          <div className="space-y-2">
            <div className="text-2xl md:text-3xl text-purple-600 dark:text-purple-400 font-bold">
              <div className="md:hidden flex flex-col items-center gap-2">
                <div className="text-4xl md:text-5xl">🎉</div>
                <div>
                  Happy {birthday.target_age}th Birthday,
                  <div className="mt-2">{birthday.recipient_name}!</div>
                </div>
                <div className="text-4xl md:text-5xl">🎂</div>
              </div>

              <div className="hidden md:block">
                🎉 Happy {birthday.target_age}th Birthday,{" "}
                {birthday.recipient_name}! 🎂
              </div>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl md:text-3xl mb-8 text-gray-800 dark:text-white">
              Countdown to {birthday.recipient_name}'s {birthday.target_age}th
              Birthday
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-lg shadow-lg">
                <span className="block font-bold text-4xl md:text-5xl text-purple-600 dark:text-purple-400">
                  {timeLeft.days}
                </span>
                <span className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                  days
                </span>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-lg shadow-lg">
                <span className="block font-bold text-4xl md:text-5xl text-purple-600 dark:text-purple-400">
                  {timeLeft.hours}
                </span>
                <span className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                  hours
                </span>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-lg shadow-lg">
                <span className="block font-bold text-4xl md:text-5xl text-purple-600 dark:text-purple-400">
                  {timeLeft.minutes}
                </span>
                <span className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                  minutes
                </span>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-lg shadow-lg">
                <span className="block font-bold text-4xl md:text-5xl text-purple-600 dark:text-purple-400">
                  {timeLeft.seconds}
                </span>
                <span className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                  seconds
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
