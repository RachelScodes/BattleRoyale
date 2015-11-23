'use strict'
///// require express packages /////////////////////////////////////////////////
let express = require('express');
let app = express();
let expressJWT = require('express-jwt');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let logger = require('morgan');
let path = require('path');
let io = require('socket.io');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/', express.static(__dirname + '/public'));

///// connect database /////////////////////////////////////////////////////////
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/battle-royale');
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






///// server ///////////////////////////////////////////////////////////////////
let server = app.listen(3000, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('server running!');
});
