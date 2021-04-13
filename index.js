require("dotenv").config();

const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require(process.env.JSON_KEY_FILE_PATH); // load info of the service worker account from the json file

const pushLatestSubmission = require("./src/spreadsheet/pushLatestSubmission");
const getDateAndTime = require("./src/getDateAndTime");
const updateRows = require("./src/spreadsheet/updateRows");

(async () => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID); // initialise the sheet - doc ID is the long id in the sheet URL
  await doc.useServiceAccountAuth(creds); // initialize auth

  await doc.loadInfo(); // load document properties and worksheets
  const sheet = doc.sheetsByIndex[0];

  let iterationCount = 0;

  const routine = async () => {
    console.log(getDateAndTime(Date.now()));
    console.log("running");
    try {
      if (iterationCount % 100 === 0) {
        await updateRows(sheet);
      }

      await pushLatestSubmission(sheet);
    } catch (error) {
      console.log(error);
    }

    ++iterationCount;

    setTimeout(async () => {
      await routine();
    }, process.env.TIME_INTERVAL);
  };

  routine();
})();
