// express app and router requires start
var express = require('express');
var router = express.Router();
var utility = require('../utility/connectionDB.js');
var profileController = require('../Controller/ProfileController.js');
// express app and router requires end

// Routing for index start
router.get('/', function (request, response) {

  console.log(request.session.theUser);
  console.log("inside index route js");
  response.render('index.ejs', {
    pageData: [],
    session: request.session.theUser
  });
});
// Routing for index end

module.exports = router;