const axios = require("axios");

module.exports = async (from, count) => {
  const url = `https://codeforces.com/api/user.status?handle=${process.env.CODEFORCES_HANDLE}&from=${from}&count=${count}`;
  const response = await axios.get(url);
  if (response.data.status === "FAILED") throw new Error(response.data.comment);
  return response.data.result;
};
