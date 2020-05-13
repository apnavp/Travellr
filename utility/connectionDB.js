// require the connection model from models start
var connectionModel = require('../model/connection');

// require the connection model from models end

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var connectionSchema = new Schema({
  connectionID: String,
  connection_name: String,
  connection_category: String,
  hosted_by: String,
  start_location: String,
  dateAndTime: String,
  details: String,
  imageurl: String
});



// data storing for database start for all categories and topics

var connectionDB = mongoose.model('connections', connectionSchema);

// ||process.env.MONGODB_URI || 'mongodb://localhost/traveller'
mongoose.connect("mongodb+srv://apnav:apnavmongo@cluster0-0z1zv.mongodb.net/test?retryWrites=true&w=majority"
  , {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("we are connected with Traveller database")
}, {
  useUnifiedTopology: true
});


// get connections function start
var getConnections = function () {
  console.log(connectionDB.find());
  return new Promise(resolve => {
    console.log(connectionDB);
    resolve(connectionDB.find().then(function (allConnections) {
      console.log("ingetconnections" + allConnections);
      var myList = [];
      for (i = 0; i <= allConnections.length - 1; i++) {
        let connection = new connectionModel.connection(
          allConnections[i].connectionID,
          allConnections[i].connection_name,
          allConnections[i].connection_category,
          allConnections[i].hosted_by,
          allConnections[i].start_location,
          allConnections[i].dateAndTime,
          allConnections[i].details,
          allConnections[i].imageurl);
        myList.push(connection);
      }
      return myList;
    }));
  })
};
// get connections function end


// get connection function start
var getConnection = async function (connectionID) {

  return await connectionDB.find({
    connectionID: connectionID
  }).then(function (detailedConnection) {
    console.log("this is connection is", connectionID);
    for (i = 0; i < detailedConnection.length; i++) {
      if (detailedConnection[i].connectionID == connectionID) {
        let connection = new connectionModel.connection(
          detailedConnection[i].connectionID,
          detailedConnection[i].connection_name,
          detailedConnection[i].connection_category,
          detailedConnection[i].hosted_by,
          detailedConnection[i].start_location,
          detailedConnection[i].dateAndTime,
          detailedConnection[i].details,
          detailedConnection[i].imageurl);
        return connection;
      }
    }
  });
}
// get connection function end

// exporting getConnections and getConnection
module.exports.getConnections = getConnections;
module.exports.getConnection = getConnection;
module.exports.connectionSchema = connectionSchema;
