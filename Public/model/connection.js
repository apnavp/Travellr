  // creating an object model named connectionModel start
  module.exports.connection = class connection {
    constructor(connectionID, connection_name, connection_category, hosted_by,
      start_location, dateAndTime, details, imageurl) {
      this.connectionID = connectionID;
      this.connection_name = connection_name;
      this.connection_category = connection_category;
      this.hosted_by = hosted_by;
      this.start_location = start_location;
      this.dateAndTime = dateAndTime;
      this.details = details;
      this.imageurl = imageurl;
    }
    // creating an object model named connectionModel end


    //getter and setters
    get getConnectionId() {
      return this.connectionID;
    }
    set setConnectionId(connectionID) {
      this.connectionID = connectionID;
    }


    get getConnection_name() {
      return this.connection_name;
    }
    set setConnection_name(connectionName) {
      this.connection_name = connectionName;
    }


    get getconnection_category() {
      return this.connection_category;
    }
    set setconnection_category(connectionCategory) {
      this.connection_category = connectionCategory;
    }


    get hostedBy() {
      return this.hosted_by;
    }
    set setDetails(hostedBy) {
      this.hosted_by = hostedBy;
    }

    get startlocation() {
      return this.start_location;
    }
    set startlocation(startLocation) {
      this.start_location = startLocation;
    }

    get getDateAndTime() {
      return this.dateAndTime;
    }
    set setDateAndTime(dateAndTime) {
      this.dateAndTime = dateAndTime;
    }

    get Details() {
      return this.details;
    }
    set Details(Details) {
      this.details = Details;
    }

    get Imageurl() {
      return this.imageurl;
    }
    set Imageurl(imageUrl) {
      this.imageurl = imageUrl;
    }
  }