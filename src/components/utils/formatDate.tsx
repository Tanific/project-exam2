export const formatDateWithSuffix = (date: Date): string => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
  
    let suffix = "th";
    if (day % 10 === 1 && day !== 11) suffix = "st";
    else if (day % 10 === 2 && day !== 12) suffix = "nd";
    else if (day % 10 === 3 && day !== 13) suffix = "rd";
  
    return `${day}${suffix} of ${month}`;
  };