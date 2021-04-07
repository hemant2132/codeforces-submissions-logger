require("dotenv").config();

const fetchLatestSubmission = require("./fetchLatestSubmission");
const pushToSpreadsheet = require("./spreadsheet");
const getDateAndTime = require("./getDateAndTime");

(async function routine() {
  console.log(getDateAndTime(Date.now()));
  console.log("running");
  try {
    const submission = await fetchLatestSubmission();
    await pushToSpreadsheet(submission);
  } catch (error) {
    console.log(error);
  }
  setTimeout(async () => {
    await routine();
  }, process.env.TIME_INTERVAL);
})();
