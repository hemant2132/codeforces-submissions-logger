const fetchSubmissions = require("../codeforces/fetchSubmissions");
const computeRowObject = require("./computeRowObject");

module.exports = async (sheet) => {
  // upper-limit for the no. of submissions
  const upperLimit = 500;

  // get submissions
  const submissions = await fetchSubmissions(1, upperLimit);

  let newSubmissionsCount = 0;
  for (let i = upperLimit - 1; i >= 0; --i) {
    if (submissions[i].id <= process.env.LAST_SUBMISSION_ID) continue;

    // data to be pushed into the new row
    const rowData = computeRowObject(submissions[i]);

    // add row to the sheet
    await sheet.addRow(rowData);

    console.log(`${rowData["Submission Link"]} pushed!`);
    process.env.LAST_SUBMISSION_ID = submissions[i].id;

    ++newSubmissionsCount;
  }

  console.log("\nTotal " + newSubmissionsCount + " submissions pushed!\n");

  // if no new submission, then increase time interval else decrease it
  if (newSubmissionsCount === 0)
    process.env.TIME_INTERVAL = Math.min(
      Number(process.env.TIME_MAX_VALUE),
      Number(process.env.TIME_INTERVAL) + Number(process.env.TIME_BASE_VALUE)
    );
  else
    process.env.TIME_INTERVAL = Math.max(
      Number(process.env.TIME_BASE_VALUE),
      Number(process.env.TIME_INTERVAL) - Number(process.env.TIME_BASE_VALUE)
    );
};
