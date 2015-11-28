'use strict'
///// require express packages /////////////////////////////////////////////////


let express = require('express');
let app = express();
let expressJWT = require('express-jwt');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let logger = require('morgan');
let path = require('path');
let config = require('./config'); ///// get our config file
let user = require('./controllers/user_controller');
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);

app.set('port', 3000);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/', express.static(__dirname + '/public'));

///// connect database /////////////////////////////////////////////////////////
let mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/battle-royale'); ///// can refactor later and pull into config file
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', (callback) => {
  console.log('db connected!');
});

///// write routes below ///////////////////////////////////////////////////////
app.get('/', function(req, res){ // test route // delete later
  res.send('hit test route!');
});

let homeRoutes = require('./controllers/home_controller' );
app.use('/home', homeRoutes);

// not needed because we'll be using ajax to make requests?
// let gameRoutes = require('./controllers/game_controller' );
// app.use('/game', gameRoutes);

let userRoutes = require('./controllers/user_controller');
app.use('/user', user);




///// parse trivia questions API  //////////////////////////////////////////////
var parseTrivaApi = function(data, attr) {
  jsonData = JSON.parse(data);
  questionData = [];
  for (var i = 0; i < jsonData.length; i++) {
    questionData.push(jsonData[i][attr])
  };
  return newData;
};

///// sockets yo ///////////////////////////////////////////////////////////////////////////
var users = [];
var addedUser = false;

io.on('connection', function(client) {
    console.log("User has connected");

    client.on('add user', function(username) {
        var userObj = {};
        userObj.name = username;
        userObj.id = client.id;
        users.push(userObj);
        addedUser = true;
        io.emit('user joined', users);
    });

    client.on('send message', function(data) {
        io.emit('send message', data);
    });

    client.on('disconnect', function() {
        console.log("User has disconnected");
        if(addedUser) {
            users.forEach(function(user) {
                if(user.id === client.id) {
                    users.splice(users.indexOf(user), 1);
                }
            });
        }
        io.emit('user joined', users);
    });
});

// app.listen(process.env.PORT || 3000, function(){
//   console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
// });

server.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'));
});
