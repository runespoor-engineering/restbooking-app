import { getDatesBetween } from "./getDatesBetween";

export const getBookedDates = (bookingOrders) => {
  console.log('======bookingOrders', bookingOrders)
  const bookedDates = [];
  bookingOrders.forEach((order) => {
    const startDate = order?.attributes?.bookingInfo?.startDate;
    const endDate = order?.attributes?.bookingInfo?.endDate;
    console.log('startDate', startDate, endDate)
    if (startDate && endDate) {
      const dates = getDatesBetween(startDate, endDate);

      console.log('==dates', dates)
      bookedDates.push(...dates);
    }
  });
  return bookedDates;
};