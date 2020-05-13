// require the user model from models start
var User = require('../model/User.js')
// require the user model from models end

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
  UserID: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    requied: true
  },
  emailAddress: {
    type: String,
    requied: true
  },
  address1Field: String,
  address2Field: String,
  city: String,
  state: String,
  postCode: String,
  country: String,
  password: String
});

var userModel = mongoose.model('users', userSchema);


module.exports.getUser = function (UserID, password) {
  return new Promise(resolve => {
    resolve(userModel.findOne({
      UserID: UserID
    }).then(function (data) {
      let users = [];
      console.log("in mongo" + data);
      if (data) {
       if(data.password == password){
        let userAdd = new User(data.UserID,
          data.firstName,
          data.lastName,
          data.emailAddress,
          data.address1Field,
          data.address2Field,
          data.city,
          data.state,
          data.postCode,
          data.country,
          data.password
        )
        return userAdd;
       }
       console.log("password not correct");
       return "password not correct";
      }else
        console.log("user does not exist");
      return "user does not exist";
    }));
  });
}

module.exports.addUser = async function (user) {

  // var ans = connection.connection_category.slice(0, 2).toUpperCase();
  // ans += Math.random().toString(36).slice(5);
  // var bns = ans.slice(0, 4);
  // console.log("in random" + ans + "  " + bns);
  // var date = connection.date +"T"+connection.time
  // var f_date_time = moment(date).format('MMMM Do YYYY, h:mm a');
  // console.log("this is formated date" + f_date_time);

  var newUser = new userModel({
    UserID:user.userID,
    firstName: user.fname,
    lastName: user.lname,
    emailAddress: user.email,
    address1Field: user.address1,
    address2Field: user.address2,
    city: user.city,
    state: user.state,
    postCode: user.postcode,
    country: user.country,
    password: user.password1
  });
  let result = await newUser.save();
  console.log(result);
  if (result == user) {
    console.log("user Added");
  } else {
    console.log("user Adding failed");
  }
}