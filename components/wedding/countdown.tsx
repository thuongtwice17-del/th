"use client";

import { useState, useEffect } from "react";
import { WeddingInfo } from "@/lib/types";

interface CountdownProps {
  weddingInfo: WeddingInfo;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown({ weddingInfo }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date(weddingInfo.wedding_date);
    if (weddingInfo.ceremony_time) {
      const [hours, minutes] = weddingInfo.ceremony_time.split(":");
      weddingDate.setHours(parseInt(hours), parseInt(minutes));
    }

    const calculateTimeLeft = () => {
      const difference = weddingDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [weddingInfo.wedding_date, weddingInfo.ceremony_time]);

  const primaryColor = weddingInfo.primary_color || "#8B1A1A";

  return (
    <div className="flex justify-center gap-4 md:gap-6">
      {[
        { value: timeLeft.days, label: "Ngày" },
        { value: timeLeft.hours, label: "Giờ" },
        { value: timeLeft.minutes, label: "Phút" },
        { value: timeLeft.seconds, label: "Giây" },
      ].map((item, index) => (
        <div key={index} className="text-center">
          <div
            className="w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center text-white text-2xl md:text-3xl font-serif"
            style={{ backgroundColor: primaryColor }}
          >
            {item.value.toString().padStart(2, "0")}
          </div>
          <span className="text-sm text-gray-600 mt-2 block">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
