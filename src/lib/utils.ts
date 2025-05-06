import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return new Date(date).toLocaleDateString("id-ID", options);
}

export function getStatusColor(status: string) {
  switch (status) {
    case "required":
      return "bg-yellow-500 text-white";
    case "approved":
      return "bg-blue-500 text-white";
    case "in_transit":
      return "bg-purple-500 text-white";
    case "delivered":
      return "bg-orange-500 text-white";
    case "completed":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}
