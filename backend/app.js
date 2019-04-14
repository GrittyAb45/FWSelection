const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cron = require("node-cron");
const DuckfeedModel = require('./models/duckfeed');
const config = require("./config");

const app = express();

mongoose.connect("mongodb+srv://abhay:8WJubO6ttjHGMd8R@cluster0-cyugp.mongodb.net/ducksfeeddata?retryWrites=true", { useNewUrlParser: true })
.then(()=>{
  console.log("Connected to DB..");
})
.catch(()=>{
  console.log('conn unsuccessful!!');
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

  if(duckfeed.scheduled){

  //console.log(cron.validate);

    let task = cron.schedule(
        (duckfeed.time.getUTCSeconds()
    +' '+duckfeed.time.getUTCMinutes()
    +' '+duckfeed.time.getUTCHours()
    +' '
    +'*'
    +' '
    +'*'
    +' '
    +'*'), ()=>
    {
    console.log('Cron under execution....\n');
    duckfeed.save();
    });

    task.start();

  }
duckfeed.save();
res.status(201).json({
  status: "201",
  message: "info added successfully"
});

});

module.exports = app;
