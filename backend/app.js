/* The app.js provides a platform for DB components and data received from the UI to be posted on to the DB.
It also ensures the implementation of the schedule feed feture and sets up responses to the UI in appropriate foramts.
The middleware express and server where node runs interract via app.js

@Author Abhay

*/
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cron = require("node-cron");
const DuckfeedModel = require('./models/duckfeed');
const config = require("./config");

//Initialize middleware
const app = express();

// Connect to the MongoDB Server/Cluster
mongoose.connect(config.dbURL,
{ useNewUrlParser: true }, function(error){
  if(error) return console.error(error);
})
.then(()=>{
  console.log("Connected to DB..");
})
.catch(()=>{
  console.log('conn unsuccessful!!');
});

// BodyParser helps to decode requests body contents among other options
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Set headers in accordance to support CORS for remote access
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

// Add/Create duckfeed data into the DB collection
app.post("/api/duckfeed",(req, res, next) => {

  const duckfeed = new DuckfeedModel(req.body);
  console.log("sch value is:"+duckfeed.scheduled);

 //Checks if user wants the duck feed process to be enabled on daily basis
  if(duckfeed.scheduled){

    //Checks if the CRON pattern for schedule is correct
  console.log("CRON job pattern valid:"+cron.validate(
    duckfeed.time.getUTCSeconds()
+' '+duckfeed.time.getUTCMinutes()
+' '+duckfeed.time.getUTCHours()
+' '
+'*'
+' '
+'*'
+' '
+'*'));

// Establishes the cronjob to trigger daily duck feed submit operation to help a small old lady.
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
    duckfeed.save()
    .then(res => {
      res.status(201).json({
        message: "CronJob executed, ducks are fed as scheduled"
      });
    })
    .catch(error => {
      error.status(500).json({
        message:"Unable to feed Ducks as per schedule"
      })
    });
  });

    task.start();

  }
duckfeed.save()
.then(cronCreated => {
  res.status(201).json({
    message: "Successfully saved all of DucksFeed Info!"
  });
})
.catch(error => {
  res.status(500).json({
    message:"Failed to Save the info provided!"
  })
});
});

module.exports = app;
