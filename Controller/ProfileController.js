// express app,router and utility requires start
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var session = require('express-session');
var connectionDB = require('../utility/connectionDB');
var userProfileDB = require('../utility/UserProfileDB.js');
// express app,router and utility requires end

app.use(session({
  secret: 'my express secret',
  resave: false,
  saveUninitialized: true
}));

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});


router.get('/logout', function (request, response) {
  request.session.destroy();
  response.render('index', {
    session: undefined
  });
})

router.all('/*', urlencodedParser, async function (request, response) {
  if (!request.session.UserProfile) {
    console.log("no user profile here");
    response.render('not_logged.ejs',{
      session: request.session.theUser
    });
  } else {
    if (!request.query.action) {
      response.render('savedConnections', {
        qs: request.session.UserProfile,
        session: request.session.theUser
      });
    } else {
      var action = request.query.action;
      var connectionID = request.query.ID;
      var formValue = request.body.formValue;
      console.log(formValue + ' formvalue');
      var alreadyExist = 0;
      var deleteExist = 0;
      if (action == 'save') {
        for (var i = 0; i <= Profile.UserConnections.length - 1; i++) {
          if (Profile.UserConnections[i].Connection.connectionID == connectionID) {
            var alreadyExist = 1;
            console.log("Connection is already present");
            if (Profile.UserConnections[i].RSVP != formValue) {
              if (formValue == undefined) {
                Profile.UserConnections[i].RSVP = 'MAYBE';
                userProfileDB.updateRSVP(connectionID, request.session.theUser.UserID, formValue);
                Profile.updateRSVP(Profile.UserConnections[i]);
                request.session.UserProfile = Profile;
                response.render('savedConnections', {
                  qs: request.session.UserProfile,
                  session: request.session.theUser
                });
              } else {
                Profile.UserConnections[i].RSVP = formValue;
                userProfileDB.updateRSVP(connectionID, request.session.theUser.UserID, formValue);
                Profile.updateRSVP(Profile.UserConnections[i]);
                request.session.UserProfile = Profile;
                console.log(Profile);
                response.render('savedConnections', {
                  qs: request.session.UserProfile,
                  session: request.session.theUser
                });
              }
            } else {
              response.render('savedConnections', {
                qs: request.session.UserProfile,
                session: request.session.theUser
              });
            }
          }
        }

        console.log(Profile.UserConnections.length);
        if (alreadyExist == 0) {
          var SingleConnection = await connectionDB.getConnection(connectionID);
          if (SingleConnection == null) {
            response.render('savedConnections', {
              qs: request.session.UserProfile,
              session: request.session.theUser
            });
            console.log("not there");
          } else {
            console.log("in add");
            console.log(formValue);
            if (formValue == undefined) {
              formValue = 'MAYBE';
              userProfileDB.addRSVP(connectionID, request.session.theUser.UserID, formValue);
              Profile.addConnection(SingleConnection, formValue);
              request.session.UserProfile = Profile;
              response.render('savedConnections', {
                qs: request.session.UserProfile,
                session: request.session.theUser
              });
            } else {
              userProfileDB.addRSVP(connectionID, request.session.theUser.UserID, formValue);
              Profile.addConnection(SingleConnection, formValue);
              request.session.UserProfile = Profile;
              response.render('savedConnections', {
                qs: request.session.UserProfile,
                session: request.session.theUser
              });
            }
          }
        }
      } else if (action == 'delete') {
        var deleteConnection = await connectionDB.getConnection(connectionID);
        if (deleteConnection == null) {
          response.render('savedConnections', {
            qs: request.session.UserProfile,
            session: request.session.theUser
          });
          console.log("not there");
        } else {
          console.log("in delete");
          userProfileDB.removeConnection(connectionID, request.session.theUser.UserID);
          Profile.removeConnection(deleteConnection);
          request.session.UserProfile = Profile;
          for (var i = 0; i <= Profile.UserConnections.length - 1; i++) {
            console.log(Profile.UserConnections[i].Connection.connectionID);
          }
          response.render('savedConnections', {
            qs: request.session.UserProfile,
            session: request.session.theUser
          });
        }
      }
    }
  }
});

// Exporting router
module.exports = router;