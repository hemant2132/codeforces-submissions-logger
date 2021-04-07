const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("./config/codeforces-submissions-log-d4049da8dda1.json"); // load info of the service worker account from the json file

const getDateAndTime = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000);
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

module.exports = async (submission) => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID); // initialise the sheet - doc ID is the long id in the sheet URL
  await doc.useServiceAccountAuth(creds); // initialize auth

  await doc.loadInfo(); // load document properties and worksheets
  const sheet = doc.sheetsByIndex[0];

  const curTimestamp = getDateAndTime(submission.creationTimeSeconds);

  const rows = await sheet.getRows();
  for (let row of rows) {
    if (row.Timestamp === curTimestamp) {
      // avoid duplicated data in sheet
      return;
    }
  }

  // data to be pushed into the new row
  let rowData = {
    Timestamp: getDateAndTime(submission.creationTimeSeconds),
    "Problem Link": `https://codeforces.com/contest/${submission.contestId}/problem/${submission.problem.index}`,
    "Contest ID":
      submission.contestId === undefined ? "" : submission.contestId,
    Index: submission.problem.index,
    Name: submission.problem.name,
    Rating: submission.problem.rating,
    Tags: "",
    "Submission Link": `https://codeforces.com/contest/${submission.contestId}/submission/${submission.id}`,
    "Programming Language": submission.programmingLanguage,
    "Submission Verdict": submission.verdict,
    Testset: submission.testset,
    "Passed Test Count": submission.passedTestCount,
    "Time Consumption": submission.timeConsumedMillis + " ms",
    "Memory Consumption":
      Math.floor(submission.memoryConsumedBytes / 1000) + " KB",
    Points:
      submission.points === undefined
        ? ""
        : submission.points + "/" + submission.problem.points,
    "Participation Type": submission.author.participantType,
    "My Notes": "",
  };

  for (let tag of submission.problem.tags) {
    rowData.Tags += tag + ", ";
  }
  rowData.Tags = rowData.Tags.substr(0, rowData.Tags.length - 2);

  // add row to the sheet
  await sheet.addRow(rowData);
};
