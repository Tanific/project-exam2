export const formatDateWithSuffix = (date: Date): string => {
    const day = date.getDate();
    const month = date.toLocaleString("en-GB", { month: "short" });
  
    let suffix = "th";
    if (day % 10 === 1 && day !== 11) suffix = "st";
    else if (day % 10 === 2 && day !== 12) suffix = "nd";
    else if (day % 10 === 3 && day !== 13) suffix = "rd";
  
    return `${day}${suffix} of ${month}`;
  };

  export function formatDateRange(dateString: string): string {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate();
    const daySuffix =
      day > 3 && day < 21
        ? day + "th"
        : day % 10 === 1
        ? day + "st"
        : day % 10 === 2
        ? day + "nd"
        : day % 10 === 3
        ? day + "rd"
        : day + "th";
    const month = dateObj.toLocaleDateString("en-GB", { month: "short" });
    return `${daySuffix} ${month}`;
  }