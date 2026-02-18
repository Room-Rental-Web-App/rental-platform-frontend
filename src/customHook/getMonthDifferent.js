
export const getMonthDayDiff = (startDate, endDate) => {
  let start = new Date(startDate);
  const end = new Date(endDate);

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  if (
    end.getDate() < start.getDate() ||
    (end.getDate() === start.getDate() &&
      end.getTime() < start.getTime())
  ) {
    months -= 1;
  }

  start = new Date(start);
  start.setMonth(start.getMonth() + months);

  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const days = Math.floor((end - start) / MS_PER_DAY);

  return {
    months: Math.max(months, 0),
    days: Math.max(days, 0),
  };
};