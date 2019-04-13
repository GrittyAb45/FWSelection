const mongoose = require("mongoose");

const duckFeedSchema = mongoose.Schema({

noOfDucks: {
  type: Number
},
feedType: {
  type: String
},
feedContent: {
  type: String
},
feedQuantity: {
  type: Number
},
time: {
  type: Date
},
location: {
  type: String
},
scheduled: Boolean
});

module.exports = mongoose.model('Duckfeed', duckFeedSchema);

