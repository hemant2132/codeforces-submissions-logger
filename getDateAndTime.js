// convert unix timestamp to date and time
module.exports = (unixTimestamp) => {
  const date = new Date(unixTimestamp);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const dateAndTime =
    day + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return dateAndTime;
};
