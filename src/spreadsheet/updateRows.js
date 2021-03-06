const fetchSubmissions = require("../codeforces/fetchSubmissions");
const computeRowObject = require("./computeRowObject");

module.exports = async (sheet) => {
  // get rows (except for the header)
  const rows = await sheet.getRows();
  const rowCount = rows.length;

  // if no submissions are present in the sheet
  if (rowCount === 0) return;

  // get submissions
  let submissions = null;
  try {
    submissions = await fetchSubmissions(1, rowCount);
  } catch (e) {
    console.log("Error in fetching submissions...", String(e));
  }

  if (submissions === null) return;

  // put submissions into an object with key as submission ID
  let submissionsObj = {};
  for (let i = rowCount - 1; i >= 0; --i) {
    submissionsObj[String(submissions[i].id)] = submissions[i];
  }

  // traverse over rows and update using submission id
  for (let i = rowCount - 1; i >= 0; --i) {
    const submissionLink = rows[i]["Submission Link"];
    if (submissionLink === undefined) continue;

    const submissionId = submissionLink.substring(
      submissionLink.lastIndexOf("/") + 1,
      submissionLink.length
    );
    if (i == rowCount - 1) process.env.LAST_SUBMISSION_ID = submissionId;
    if (!(submissionId in submissionsObj)) continue;

    const rowData = computeRowObject(submissionsObj[submissionId]);
    for (let [key, value] of Object.entries(rowData)) {
      rows[i][key] = value;
    }

    await rows[i].save();
  }

  console.log("\nRows updated!\n");
};
