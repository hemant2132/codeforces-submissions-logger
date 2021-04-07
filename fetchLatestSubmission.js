const axios = require("axios");

module.exports = async () => {
  const url = `https://codeforces.com/api/user.status?handle=${process.env.CODEFORCES_HANDLE}&from=1&count=1`;
  const response = await axios.get(url);
  if (response.data.status === "FAILED") throw new Error(response.data.comment);
  return response.data.result[0];
};
