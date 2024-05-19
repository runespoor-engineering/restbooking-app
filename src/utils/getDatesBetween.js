export const getDatesBetween = (startDate, endDate) => {
  const datesArray = [];
  const currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    datesArray.push(new Date(currentDate).toDateString());
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return datesArray;
};

export const isSameDay = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
