const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const DuckfeedModel = require('./models/duckfeed');
const config = require("./config");

const app = express();

mongoose.connect(config.dbURL, { useNewUrlParser: true })
.then(()=>{
  console.log("Connected to DB..");
})
.catch(()=>{
  console.log('conn unsucessful!!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST"
  );
  next();
});

app.post("/api/duckfeed",(req, res, next) => {

  const duckfeed = new DuckfeedModel(req.body);
console.log(duckfeed);
duckfeed.save();
res.status(201).json({
  status: "201",
  message: "info added successfully"
});

});

module.exports = app;
