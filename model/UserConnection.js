class UserConnection {
  constructor(Connection, RSVP) {
    this.Connection = Connection;
    this.RSVP = RSVP;
  }

  //getter and setters
  get getConnection() {
    return this.Connection;
  }
  set setConnection(Connection) {
    this.Connection = Connection;
  }

  get getRSVP() {
    return this.RSVP;
  }
  set setRSVP(RSVP) {
    this.RSVP = RSVP;
  }


}

module.exports = UserConnection;