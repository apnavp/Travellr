class User {
  constructor(UserID, firstName, lastName, emailAddress, address1Field, address2Field, city, state, postCode, country) {
    this.UserID = UserID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.emailAddress = emailAddress;
    this.address1Field = address1Field;
    this.address2Field = address2Field;
    this.city = city;
    this.state = state;
    this.postCode = postCode;
    this.country = country
  }

  //getter and setters
  get getuserId() {
    return this.UserID;
  }
  set setuserId(UserID) {
    this.UserID = UserID;
  }

  get getfirstName() {
    return this.firstName;
  }
  set setfirstName(firstName) {
    this.firstName = firstName;
  }

  get getlastName() {
    return this.lastName;
  }
  set setlastName(lastName) {
    this.lastName = lastName;
  }

  get getEmailAddress() {
    return this.emailAddress;
  }
  set setEmailAddress(emailAddress) {
    this.emailAddress = emailAddress;
  }

  get getAddress1Field() {
    return this.address1Field;
  }
  set setAddress1Field(address1Field) {
    this.address1Field = address1Field;
  }

  get getAddress2Field() {
    return this.address2Field;
  }
  set setAddress2Field(address2Field) {
    this.address2Field = address2Field;
  }

  get getCity() {
    return this.city;
  }
  set setCity(city) {
    this.city = city;
  }

  get getState() {
    return this.State;
  }
  set setState(State) {
    this.State = State;
  }

  get getPostcode() {
    return this.postCode;
  }
  set setPostcode(postCode) {
    this.postCode = postCode;
  }

  get getCountry() {
    return this.country;
  }
  set setCountry(country) {
    this.country = country;
  }
}
module.exports = User;