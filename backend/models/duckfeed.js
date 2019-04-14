const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const duckFeedSchema = mongoose.Schema({

ownerName: {
type: String,
required: true
},
email:{
type: String
},
phone: {
  type: String
},
noOfDucks: {
  type: Number,
  required: true,
},
feedType: {
  type: String,
  required: true
},
feedContent: {
  type: String
},
feedQuantity: {
  type: Number,
  required: true
},
time: {
  type: Date,
  required: true
},
location: {
  type: String,
  required: true
},
scheduled: Boolean
});

duckFeedSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Duckfeed', duckFeedSchema);

