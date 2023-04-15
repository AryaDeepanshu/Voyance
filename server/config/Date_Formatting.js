const { format, parseISO } = require("date-fns");

const getFormattedDate = (date) =>
  date ? format(parseISO(date), "MM/dd/yyyy") : "";

module.exports.calculateDateDiff = (startDate, endDate) => {
  console.log(startDate);
  console.log(endDate);
  const formattedStartDate = getFormattedDate(startDate);
  const formattedEndDate = getFormattedDate(endDate);
  return Math.floor(
    (Date.parse(formattedEndDate) - Date.parse(formattedStartDate)) / 86400000
  );
};
