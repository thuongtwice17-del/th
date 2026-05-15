"use client";

import { WeddingInfo } from "@/lib/types";

interface CalendarProps {
  weddingInfo: WeddingInfo;
}

export function Calendar({ weddingInfo }: CalendarProps) {
  const weddingDate = new Date(weddingInfo.wedding_date);
  const month = weddingDate.getMonth();
  const year = weddingDate.getFullYear();
  const day = weddingDate.getDate();

  const primaryColor = weddingInfo.primary_color || "#8B1A1A";

  const monthNames = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
  ];

  const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  // Get first day of month and total days
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create calendar grid
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-xs mx-auto">
      {/* Month header */}
      <div
        className="text-center py-2 rounded-t-lg text-white font-medium"
        style={{ backgroundColor: primaryColor }}
      >
        {monthNames[month]} {year}
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mt-2">
        {dayNames.map((dayName, index) => (
          <div
            key={index}
            className="text-center text-xs font-medium text-gray-500 py-1"
          >
            {dayName}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((calDay, index) => (
          <div
            key={index}
            className={`text-center py-2 text-sm rounded ${
              calDay === day
                ? "text-white font-bold"
                : calDay
                ? "text-gray-700"
                : ""
            }`}
            style={calDay === day ? { backgroundColor: primaryColor } : {}}
          >
            {calDay}
          </div>
        ))}
      </div>
    </div>
  );
}
