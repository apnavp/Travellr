// express app,router and utility requires start
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var userProfile = require('../model/UserProfile');
var session = require('express-session');
var userDbUtil = require('../utility/UserDB');
var session = require('express-session');
var connectionDB = require('../utility/connectionDB');
var UserConnectionObject = require('../model/UserConnection.js');
var userProfileDB = require('../utility/UserProfileDB.js');
const {
  check,
  validationResult,
  body
} = require("express-validator");
// express app,router and utility requires end


var urlencodedParser = bodyParser.urlencoded({
  extended: false
});


router.get('/', async function (request, response) {
  if (!request.session.theUser) {
    response.render('login', {
      pageData: [],
      session: request.session.theUser,
      Success: true,

    });
  } else {
    user = request.session.theUser;
    request.session.theUser = user;
    var findout = await userProfileDB.getUserProfile(request.session.theUser.UserID);
    var UserConnections = [];
    for (var i = 0; i < findout.length; i++) {
      var connection = await connectionDB.getConnection(findout[i].connectionID)
      console.log("inprofile" + connection);
      var addConnection = new UserConnectionObject(connection, findout[i].RSVP);
      UserConnections.push(addConnection);
    }
    Profile = new userProfile(request.session.theUser.UserID);
    Profile.UserConnections = UserConnections;
    request.session.UserProfile = Profile;
    response.render('savedConnections', {
      session: request.session.theUser,
      qs: request.session.UserProfile,
    });
  }
});

router.post('/', urlencodedParser, [
  check("login")
  .not()
  .isEmpty()
  .withMessage("Login id field can't be blank"),
  check("password")
  .not()
  .isEmpty()
  .withMessage("Password field can't be blank")
  .isLength(6)
  .withMessage("Minimum 6 characters")
], async function (request, response, next) {
  console.log(request.body.login + "   " + request.body.password);
  const errors = validationResult(request).array();
  let passwordErrors = errors.find(val => {
    return val.param == "password";
  });
  let loginErrors = errors.find(val => {
    return val.param == "login";
  });
  let loginObject = [loginErrors, passwordErrors];
  console.log(loginObject);
  if (errors[0] == undefined && errors[1] == undefined) {
    let users = await userDbUtil.getUser(request.body.login, request.body.password);
    console.log("users are" + users);
    if (users=="password not correct") {
      console.log("inside user controller-password not correct");
      response.render("login", {
        pageData: loginObject,
        Success: false,
        session: request.session.theUser,
        msg: "Password not correct. Please try again"
      });
    }
      else if(users=="user does not exist"){
        console.log(" inside user controller-user does not exist");
        response.render("login", {
          pageData: loginObject,
          Success: false,
          session: request.session.theUser,
          msg: "User does not exist"
        });
      }
      else if (users) {
      user = users;
      request.session.theUser = user;
      var findout = await userProfileDB.getUserProfile(request.body.login);
      var UserConnections = [];
      for (var i = 0; i < findout.length; i++) {
        var connection = await connectionDB.getConnection(findout[i].connectionID)
        console.log("inprofile" + connection);
        var addConnection = new UserConnectionObject(connection, findout[i].RSVP);
        UserConnections.push(addConnection);
      }
      Profile = new userProfile(request.session.theUser.UserID);
      Profile.UserConnections = UserConnections;
      request.session.UserProfile = Profile;
      response.render('savedConnections', {
        session: request.session.theUser,
        qs: request.session.UserProfile,
      });
    } else {
      console.log("login or password not correct");
      response.render("login", {
        pageData: loginObject,
        Success: false,
        session: request.session.theUser,
        msg:"Either username of password not correct"
      });
    }
  } else {
    response.render('login', {
      pageData: loginObject,
      session: request.session.theUser,
      UserID: undefined,
      Success: true,
    });
    next();
  }
});

// Exporting router
module.exports = router;