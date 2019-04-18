
const duckfeedModel = require('../models/duckfeed');
const CronJob = require('../../node_modules/cron/lib/cron').CronJob;
const cron = require('node-cron');

exports.createDuckfeed = (req, res, next) => {

  let duckfeedSchedule = new duckfeedModel(req.body);

  console.log("sch value is:"+duckfeedSchedule.scheduled);

 //Checks if user wants the duck feed process to be enabled on daily basis
  if(duckfeedSchedule.scheduled!=null && duckfeedSchedule.scheduled){

    //Checks if the CRON pattern for schedule is correct
  console.log("CRON job pattern valid:"+cron.validate(
    duckfeedSchedule.time.getUTCSeconds()
    +' '
    +duckfeedSchedule.time.getUTCMinutes()
    +' '
    +duckfeedSchedule.time.getUTCHours()
    +' '
    +'*'
    +' '
    +'*'
    +' '
    +'*'));

// Establishes the cronjob to trigger daily duck feed submit operation to help a small old lady.
    let job = new CronJob(
    '*'
    +' '
    +duckfeedSchedule.time.getUTCSeconds()
    +' '
    +duckfeedSchedule.time.getUTCMinutes()
    +' '
    +duckfeedSchedule.time.getUTCHours()
    +' '
    +'*'
    +' '
    +'*', function()
    {
    console.log('Cron under execution....\n');
    console.log(duckfeedSchedule);
    duckfeedSchedule.save()
    });

job.start();

  }
}

exports.duckfeedNotScheduled = (req, res, next) => {

  let dfData = new duckfeedModel(req.body);

  dfData.save()
  .then((result) => {
    return res.status(201).json({
      message: "Successfully saved the duckfeed data!",
      result: result
    });
  })
  .catch(err =>{
    return res.status(500).json({
      message: "Failed to create duckdata info!"
    });
  });
};

exports.getDuckfeeds = (req, res, next) => {

  let accData;

  duckfeedModel.find()
  .then((data) => {
    accData = data;
    return duckfeedModel.count;
  })
  .then((count) =>{
    res.status(200).json({
      duckfeeds:accData,
      feedCount: count
    })}).catch((err) =>{
      res.status(500).json({
        message:"unable to fetch data!"
      })
    });
}


