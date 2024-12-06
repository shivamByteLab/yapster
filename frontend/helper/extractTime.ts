export function extractTime(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}

export function TimeAgo(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);

  // Helper to reset a date to midnight
  const resetToMidnight = (date: Date) => new Date(date.setHours(0, 0, 0, 0));

  const today = resetToMidnight(new Date());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const differenceInDays = Math.floor((today.getTime() - resetToMidnight(new Date(dateString)).getTime()) / (1000 * 60 * 60 * 24));

  if (past >= today) {
    // If the message is today
    return "Today";
  }

  if (past >= yesterday) {
    // If the message is yesterday
    return "Yesterday";
  }

  if (differenceInDays < 7) {
    // Messages within the last week
    return past.toLocaleDateString("en-US", { weekday: "long" }); // Example: "Monday"
  }

  if (now.getFullYear() === past.getFullYear()) {
    // Messages earlier this year
    return past.toLocaleDateString("en-US", { month: "short", day: "numeric" }); // Example: "Nov 27"
  }

  // Messages from previous years
  return past.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }); // Example: "Nov 27, 2023"
}
