const fetchSubmissions = require("../codeforces/fetchSubmissions");
const computeRowObject = require("./computeRowObject");

module.exports = async (sheet) => {
  // get latest submission
  let submission = await fetchSubmissions(1, 1);
  submission = submission[0];

  // avoid duplicated entry in sheet
  if (String(submission.id) === process.env.LAST_SUBMISSION_ID) {
    console.log(
      `https://codeforces.com/contest/${submission.contestId}/submission/${submission.id} already pushed.`
    );
    return;
  }

  // data to be pushed into the new row
  const rowData = computeRowObject(submission);

  // add row to the sheet
  await sheet.addRow(rowData);

  console.log(`${rowData["Submission Link"]} pushed!`);
  process.env.LAST_SUBMISSION_ID = submission.id;
};
