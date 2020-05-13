// express app,router and utility requires start
var express = require('express');
var router = express.Router();
var utility = require('../utility/connectionDB.js');
var session = require('cookie-session');
// express app,router and utility requires end


// Routing for about connections start
router.get('/', async function (request, response) {
  var ID = request.query.ID;
  console.log("id not found");
  var listTrek = await utility.getConnection(ID);
  console.log(listTrek);

  if (listTrek == undefined) {
    var listTrek = await utility.getConnections();
    var categories = [];
    for (var i = 0; i < listTrek.length; i++) {
      categories.push(listTrek[i].connection_category)
    }
    var uniqueCat = categories.filter((v, i, a) => a.indexOf(v) === i);
    console.log(uniqueCat);
    response.render('connections.ejs', {
      qs: listTrek,
      uc: uniqueCat,
      session: request.session.theUser
    });

  } else {
    response.render('connection.ejs', {
      qs: listTrek,
      session: request.session.theUser
    });
  }

});


// Routing for about connections end


// exporting router
module.exports = router;