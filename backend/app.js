/* The app.js provides a platform for DB components and data received from the UI to be posted on to the DB.
It also ensures the implementation of the schedule feed feture and sets up responses to the UI in appropriate foramts.
The middleware express and server where node runs interract via app.js

@Author Abhay

*/
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const config = require("./config");
const routes = require('./routes/duckfeedCreate');


//Initialize middleware
const app = express();

// Connect to the MongoDB Server/Cluster
mongoose.connect(config.dbURL,
{ useNewUrlParser: true })
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

app.use("/api/duckfeed", routes);

module.exports = app;
