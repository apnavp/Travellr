//require express
var express = require('express');
var session = require('cookie-session');
var app = express();
//require express end


//require body-parser
var bodyParser = require('body-parser');
var connectionDB = require('./utility/connectionDB');
//require body-parser end

// routes for index,connection,connections,about,contact,newConnection,Savedconnection
var connections = require('./routes/connections');
var about = require('./routes/about');
var connection = require('./routes/connection');
var index = require('./routes/index');
var signup = require('./routes/signup');
var contact = require('./routes/contact');
var newConnection = require('./routes/newConnection');
var ProfileController = require('./Controller/ProfileController.js');
var UserController = require('./Controller/UserController.js');
// routes for index,connection,connections,abbout,contact,newConnection,Savedconnection start



//  view engine,views
app.set('view engine', 'ejs');

//set the path for static resources to be accessible
app.use('/assets', express.static('assets'));

app.use(session({
  secret: 'Milestone',
  resave: false,
  saveUninitialized: true
}));
//custom route implementation

// paths for index,connection,connections,abbout,contact,newConnection,Savedconnection start

app.use('/newConnection', newConnection);
app.use('/connections', connections);
app.use('/connection', connection);
app.use('/savedconnections', ProfileController);
app.use('/about', about);
app.use('/contact', contact);
app.use('/login', UserController);
app.use('/signup', signup);
app.use('/*', index);
// paths for index,connection,connections,abbout,contact,newConnection,Savedconnection end

// server Start
app.listen(8084);
console.log("Listenting to port 8084");
//server end