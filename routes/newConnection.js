// express app,router and utility requires start
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var userProfileDB = require('../utility/UserProfileDB.js');



const {
  check,
  validationResult,
  body
} = require("express-validator");
var urlencodedParser = bodyParser.urlencoded({
  extended: true
});
// express app,router and utility requires end
// Routing for newConnection start
var inserted = null;


router.get('/', function (request, response) {
  console.log("here inside new connection GET");
  if (request.session.theUser) {
    console.log("inside new connection route js");
    inserted = false;
    response.render('newConnection.ejs', {
      pageData: [],
      session: request.session.theUser,
      inserted: inserted
    });
  } else {
    response.render('index.ejs', {
      session: request.session.theUser
    });
  }
});

router.post('/', urlencodedParser,
  [
    check("connection_name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name of event cannot be blank")
    .isLength({
      min: 5
    })
    .withMessage('Connection name should contain atleast 5 characters.')
    .escape(),
    check("connection_category")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Category cannot be blank")
    .escape(),
    check("start_location")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Start location cannot be blank")
    .isLength({
      min: 3
    })
    .withMessage('location should contain atleast 3 characters.')
    .escape(),

    check("date")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Date cannot be blank")
    //custom validator to check for entered date greater than current date
    .custom((value) => {
      var GivenDate = new Date(value);
      var CurrentDate = new Date();
      console.log("this is given date" + GivenDate);
      console.log("this is today's date" + CurrentDate);
      if (GivenDate > CurrentDate) {
        return true
      }
      return false
    })
    .withMessage('Date should be greater than the current date.')
    .escape(),

    check("time")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Time cannot be blank")
    .escape(),

    check("details")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Details field cannot be blank")
    .isLength({
      min: 5
    })
    .withMessage('Deatils should contain brief description')
    .escape()
  ],
  async function (request, response, next) {
    if (request.session.theUser) {
      console.log("in new info new connection");
      const errors = validationResult(request).array();
      console.log(errors);
      if (errors.length > 0) {
        let nameErrors = errors.find(val => {
          return val.param == "connection_name";
        });
        let categoryErrors = errors.find(val => {
          return val.param == "connection_category";
        });
        let locationErrors = errors.find(val => {
          return val.param == "start_location";
        });
        let dateErrors = errors.find(val => {
          return val.param == "date";
        });
        let timeErrors = errors.find(val => {
          return val.param == "time";
        });
        let detailErrors = errors.find(val => {
          return val.param == "details";
        });
        let errorObject = [
          nameErrors,
          categoryErrors,
          locationErrors,
          dateErrors,
          timeErrors,
          detailErrors
        ];
        response.render("newConnection", {
          pageData: errorObject,
          session: request.session.theUser,
          inserted: inserted
        });
      } else {
        if (request.body != undefined) {
          console.log(request.body);
          await userProfileDB.addConnection(request.body, request.session.theUser.firstName).then(function () {
            inserted = true;
            response.render('newConnection', {
              pageData: [],
              session: request.session.theUser,
              inserted: inserted
            });
          })
        } else {
          response.render('newConnection', {
            pageData: [],
            session: request.session.theUser,
            inserted: inserted
          });
        }
      }
      if (!request.session.theUser) {
        response.render('index', {
          session: undefined
        });
      }
    } else {
      console.log("user not logged in");
    }
    next();
  });
// Routing for newConnection end
// Exporting to router
module.exports = router;