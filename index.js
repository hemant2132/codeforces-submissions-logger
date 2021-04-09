require("dotenv").config();

const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require(process.env.JSON_KEY_FILE_PATH); // load info of the service worker account from the json file

const fetchLatestSubmission = require("./src/fetchLatestSubmission");
const pushToSpreadsheet = require("./src/spreadsheet");
const getDateAndTime = require("./src/getDateAndTime");

(async () => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID); // initialise the sheet - doc ID is the long id in the sheet URL
  await doc.useServiceAccountAuth(creds); // initialize auth

  await doc.loadInfo(); // load document properties and worksheets
  const sheet = doc.sheetsByIndex[0];

  const routine = async () => {
    console.log(getDateAndTime(Date.now()));
    console.log("running");
    try {
      const submission = await fetchLatestSubmission();
      await pushToSpreadsheet(sheet, submission);
    } catch (error) {
      console.log(error);
    }
    setTimeout(async () => {
      await routine();
    }, process.env.TIME_INTERVAL);
  };

  routine();
})();
