// express app,router and utility requires start
var express = require('express');
var router = express.Router();
// express app,router and utility requires end

// Routing for about start
router.get('/', function (request, response) {
  response.render('about.ejs', {
    session: request.session.theUser
  });
});
// Routing for about end

// exporting router
module.exports = router;