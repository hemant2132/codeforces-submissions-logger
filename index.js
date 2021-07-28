require("dotenv").config();

const { GoogleSpreadsheet } = require("google-spreadsheet");

const pushSubmissions = require("./src/spreadsheet/pushSubmissions");
const getDateAndTime = require("./src/getDateAndTime");
const updateRows = require("./src/spreadsheet/updateRows");

(async () => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID); // initialise the sheet - doc ID is the long id in the sheet URL
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  }); // initialize auth

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

      await pushSubmissions(sheet);
    } catch (error) {
      console.log(error);
    }

    ++iterationCount;

    setTimeout(async () => {
      await routine();
    }, Number(process.env.TIME_INTERVAL));
  };

  routine();
})();
