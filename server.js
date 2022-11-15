require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const { updateMongoFromGoogle } = require("./functions/updateMongoFromGoogle");

updateMongoFromGoogle()

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/updateMongo", async (req, res) => {
  console.log("fetching from Google");
  const funcRes = await updateMongoFromGoogle();
  res.json(funcRes);
});

app.listen(port, () => {
  console.log(`Mongo Updater listening on port ${port}`);
});
