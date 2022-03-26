export function formatDate(date: Date, format?: string) {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  switch (format) {
    case "YYYY-MM-DD":
      return [year, month, day].join("-");
    case "YYYY.MM.DD":
      return [year, month, day].join(".");
    case "YY.MM.DD":
      return [year.slice(2, 4), month, day].join(".");
    case "MM-DD":
      return [month, day].join("-");
    case "hh:mm":
      return [hours, minutes].join(":");
    case "YYYY":
      return year;
    case "MM":
      return month;
    case "DD":
      return day;

    default:
      return [year, month, day].join("-");
  }
}
