// express app and router requires start
var express = require('express');
var router = express.Router();
// express app and router requires end

// Routing for contact start
router.get('/', function (request, response) {

  response.render('contact.ejs', {
    session: request.session.theUser
  });
});
// Routing for contact end

// exporting to router
module.exports = router;