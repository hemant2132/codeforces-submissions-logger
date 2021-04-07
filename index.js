require("dotenv").config();

const fetchLatestSubmission = require("./fetchLatestSubmission");

setInterval(async () => {
  try {
    await fetchLatestSubmission();
  } catch (error) {
    console.log(error);
  }
}, process.env.TIME_INTERVAL);
