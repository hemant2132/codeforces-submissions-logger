const fetchSubmissions = require("../codeforces/fetchSubmissions");
const getDateAndTime = require("../getDateAndTime");

const computeRowObject = (submission) => {
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
  };

  for (let tag of submission.problem.tags) {
    rowData.Tags += tag + ", ";
  }
  rowData.Tags = rowData.Tags.substr(0, rowData.Tags.length - 2);

  return rowData;
};

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
