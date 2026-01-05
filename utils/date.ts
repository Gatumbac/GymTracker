export const isSameDay = (date1: Date | string, date2: Date | string): boolean => {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export const getDayOfWeekFromDate = (date: Date | string): number => {
  const d = typeof date === 'string' ? new Date(date) : date;
  let jsDay = d.getDay();
  jsDay = jsDay === 0 ? 6 : jsDay - 1;
  return jsDay;
};
