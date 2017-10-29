const express = require("express");
const app = express();
const path = require('path');
const cryptoJS = require("crypto-js");
const axios = require("axios");
const cors = require("cors");

const apiUrl = "https://gateway.marvel.com:443/v1/public";

let privateKey = "";
let publicKey = "";

app.use(cors());
app.use(express.static(path.join(__dirname, "../")));

app.get("/characters", (req, res) => {
  return getMarvelResponse(req.originalUrl).then(data => {
    res.send(data);
  });
});

function getMarvelResponse(originalUrl) {
  const timestamp = new Date().getTime();
  const hash = cryptoJS.MD5(timestamp + privateKey + publicKey).toString();
  const paramsExist = !!originalUrl.match(/\?/);
  const fullUrl =
    apiUrl +
    originalUrl +
    (paramsExist ? "&" : "?") +
    "apikey=" +
    publicKey +
    "&hash=" +
    hash +
    "&ts=" +
    timestamp;

  return axios
    .get(fullUrl)
    .then(resp => {
      return resp.data.data;
    })
    .catch(err => {
      console.log("Error occured calling Marvel API: " + err);
      return {};
    });
}

app.listen(1111, function() {
  console.log("Marvel Proxy port 1111");
  if (process.argv.length > 2) {
    privateKey = process.argv[2];
  } else {
    throw new Error("No private key provided");
  }
  if (process.argv.length > 3) {
    publicKey = process.argv[3];
  } else {
    throw new Error("No public key provided");
  }

  axios.create({
    baseURL: apiUrl
  });
});
