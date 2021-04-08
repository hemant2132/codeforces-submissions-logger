const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("./config/codeforces-submissions-log-d4049da8dda1.json"); // load info of the service worker account from the json file
const getDateAndTime = require("./getDateAndTime");

module.exports = async (submission) => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID); // initialise the sheet - doc ID is the long id in the sheet URL
  await doc.useServiceAccountAuth(creds); // initialize auth

  await doc.loadInfo(); // load document properties and worksheets
  const sheet = doc.sheetsByIndex[0];

  // avoid duplicated entry in sheet
  if (String(submission.id) === process.env.LAST_SUBMISSION_ID) {
    console.log(
      `https://codeforces.com/contest/${submission.contestId}/submission/${submission.id} already pushed.`
    );
    return;
  }

  // data to be pushed into the new row
  let rowData = {
    Timestamp: getDateAndTime(submission.creationTimeSeconds * 1000),
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

  console.log(`${rowData["Submission Link"]} pushed!`);
  process.env.LAST_SUBMISSION_ID = submission.id;
};
