export function formatDate(
  isoDateString: string | undefined,
  use24HourFormat: boolean = false
): string {
  if (!isoDateString) return "--";
  const originalDate = new Date(isoDateString);

  const year = originalDate.getFullYear();
  const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
  const day = originalDate.getDate().toString().padStart(2, "0");
  let hours = originalDate.getHours();
  const minutes = originalDate.getMinutes().toString().padStart(2, "0");

  if (!use24HourFormat) {
    const period = hours < 12 ? "AM" : "PM";
    hours = hours % 12 || 12;
    return `${year}/${month}/${day} ${hours}:${minutes} ${period}`;
  }

  const formattedHours = hours.toString().padStart(2, "0");
  return `${year}/${month}/${day} ${formattedHours}:${minutes}`;
}
