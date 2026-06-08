export function getTimeFromDatetime(
  datetime: string,
  use24Hour: boolean = true
): string {
  const date = new Date(datetime)
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: !use24Hour,
  })
}
export function combineDateAndTime(date: Date, time: string): string {
  return date.toISOString().split("T")[0] + "T" + time
}
export function getDateFromDatetime(datetime: string): Date {
  return new Date(datetime)
}
