/* today's Date: */
const date = new Date();
const day = String(date.getDate()).padStart(2, "0");
const month = String(date.getMonth() + 1).padStart(2, "0");
export const today = date.getFullYear() + "-" + month + "-" + day;

/* tomorrow's Date: */
var nextDate = new Date();
nextDate.setDate(nextDate.getDate() + 1);
const tomorrowDay = String(nextDate.getDate()).padStart(2, "0");
const tomorrowMonth = String(nextDate.getMonth() + 1).padStart(2, "0");
export const tomorrow =
  nextDate.getFullYear() + "-" + tomorrowMonth + "-" + tomorrowDay;

/* convert date:  */
export const decode = (date) => {
  const ymd = date.split("-");
  return `${ymd[1]}/${ymd[2]}/${ymd[0]} `;
};

/* Calculate difference b/w date in case of "string" format: */
export const datediff = (first, second) => {
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
};

/* Parse Date: */
export const parseDate = (str) => {
  var ydm = str.split("-");
  return new Date(Number(ydm[0]), Number(ydm[1]) - 1, Number(ydm[2]));
};
