// express app,router and utility requires start
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var userProfileDB = require('../utility/UserProfileDB.js');
var userDbUtil = require('../utility/UserDB');
const {
  check,
  validationResult,
  body
} = require("express-validator");
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
// express app,router and utility requires end
// Routing for newConnection start
var inserted = null;

router.get('/', function(request, response) {
  // console.log("inside singup controller GET")
  inserted = false;
  response.render('signup.ejs', {
    pageData: [],
    session: request.session.theUser,
    inserted: inserted
  });
});

router.post('/', urlencodedParser,
  [
    check("userID")
    .trim()
    .not()
    .isEmpty()
    .withMessage("User ID be blank")
    .escape(),

    check("password1")
    .trim()
    .not()
    .isEmpty()
    .withMessage("password cannot be blank")
    .isLength({
      min: 5
    })
    .withMessage('password should contain atleast 5 characters.')
    // .matches('password2')
    // .withMessage('Passwords must match.')
    .escape(),

    check("password2")
    .trim()
    .not()
    .isEmpty()
    .withMessage("password cannot be blank")
    .isLength({
      min: 5
    })
    .withMessage('password should contain atleast 5 characters.')

    .custom((value, {
      req,
      loc,
      path
    }) => {
      if (value == req.body.password1) {
        return true;
      } else {
        return false;
      }
    }).withMessage("Passwords don't match.")
    // custom validator to check for entered date greater than current date
    // .custom((value,{request}) => {
    //     pass1=request.body.password1;
    //   console.log("this is passsword1" + pass1);
    //   console.log("this is password2" + value);
    //   if (pass2 == value) {
    //     return true
    //   }
    //   return false
    // })
    // .withMessage('Date should be greater than the current date.')
    // .matches('password1')
    // .withMessage('Passwords must match.')
    .escape(),

    check("fname")
    .trim()
    .not()
    .isEmpty()
    .withMessage("First Name be blank")
    .escape(),

    check("lname")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Last Name be blank")
    .escape(),

    check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email cannot be blank")
    .isEmail()
    .withMessage('Enter a valid Email')
    .escape(),

    check("address1")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Address Field cannot be blank")
    .escape(),

    check("address2")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Address Field cannot be blank")
    .escape(),



    check("city")
    .trim()
    .not()
    .isEmpty()
    .withMessage("City cannot be blank")
    .escape(),

    check("state")
    .trim()
    .not()
    .isEmpty()
    .withMessage("State cannot be blank")
    .escape(),

    check("postcode")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Postal code cannot be blank")
    .isNumeric()
    .withMessage("Postal code should contain only numbers")
    .escape(),

    check("country")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Country be blank")
    .escape(),

  ],
  async function(request, response, next) {
    // if (request.session.theUser) {
    // console.log("in Signup controller");
    const errors = validationResult(request).array();
    // console.log(errors);
    if (errors.length > 0) {
      let pass1Errors = errors.find(val => {
        return val.param == "password1";
      });
      let pass2Errors = errors.find(val => {
        return val.param == "password2";
      });
      let FirstErrors = errors.find(val => {
        return val.param == "fname";
      });
      let LastErrors = errors.find(val => {
        return val.param == "lname";
      });
      let emailErrors = errors.find(val => {
        return val.param == "email";
      });
      let address1Errors = errors.find(val => {
        return val.param == "address1";
      });
      let address2Errors = errors.find(val => {
        return val.param == "address2";
      });
      let cityErrors = errors.find(val => {
        return val.param == "city";
      });
      let stateErrors = errors.find(val => {
        return val.param == "state";
      });
      let postErrors = errors.find(val => {
        return val.param == "postcode";
      });
      let countryErrors = errors.find(val => {
        return val.param == "country";
      });
      let userErrors = errors.find(val => {
        return val.param == "userID";
      });
      let errorObject = [
        pass1Errors,
        pass2Errors,
        FirstErrors,
        LastErrors,
        emailErrors,
        address1Errors,
        address2Errors,
        cityErrors,
        stateErrors,
        postErrors,
        countryErrors,
        userErrors
      ];
      console.log(errorObject);

      return response.render("signup", {
        pageData: errorObject,
        session: request.session.theUser,
        inserted: inserted
      });


    } else {
      if (request.body != undefined) {
        // console.log("call to adduser");
        // console.log(request.body);
        await userDbUtil.addUser(request.body).then(function() {
          inserted = true;
          response.render('signup', {
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
    // } else {
    //     console.log("user not logged in");
    // }
    next();
  });
// Routing for newConnection end
// Exporting to router
module.exports = router;