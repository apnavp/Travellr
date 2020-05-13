var UserConnectionObject = require('./UserConnection.js');
var connectionDB = require('../utility/connectionDB.js')
class UserProfile {
  constructor(UserID) {
    this.UserID = UserID;
    this.UserConnections = [];
  }

  addConnection(Connection, RSVP) {
    if (this.UserConnections.length == 0) {
      this.UserConnections.push(new UserConnectionObject(Connection, RSVP));
    } else {
      var equalCheck = 0;
      var index = null;
      for (var i = 0; i <= this.UserConnections.length - 1; i++) {
        console.log(this.UserConnections[i].Connection.connectionID + "  " + Connection.connectionID);
        if (this.UserConnections[i].Connection.connectionID == Connection.connectionID) {
          equalCheck = 1;
          index = i;
          console.log("equal ");
        }
      }
      console.log(index);
      if (equalCheck == 0) {
        console.log(equalCheck);
        this.UserConnections.push(new UserConnectionObject(Connection, RSVP))
      }
    }
  }

  removeConnection(Connection) {
    for (var i = 0; i <= this.UserConnections.length - 1; i++) {
      if (this.UserConnections[i].Connection.connectionID == Connection.connectionID) {
        this.UserConnections.splice(i, 1);
        break;
      }
    }
  }

  updateRSVP(UserConnectionUpdate) {
    return UserConnectionUpdate;
  }

  getConnections() {
    return this.UserConnections;
  }

}

module.exports = UserProfile;