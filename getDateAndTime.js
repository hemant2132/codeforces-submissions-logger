const convertTZ = (date, tzString) => {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
};

module.exports = (unixTimestamp) => {
  let date = new Date(unixTimestamp);
  date = convertTZ(date, process.env.TIME_ZONE);
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
