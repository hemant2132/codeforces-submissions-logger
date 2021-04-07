require("dotenv").config();

const fetchLatestSubmission = require("./fetchLatestSubmission");
const pushToSpreadsheet = require("./spreadsheet");

async function routine() {
  try {
    const submission = await fetchLatestSubmission();
    await pushToSpreadsheet(submission);
  } catch (error) {
    console.log(error);
  }
  setTimeout(async () => {
    await routine();
  }, process.env.TIME_INTERVAL);
}

routine();
