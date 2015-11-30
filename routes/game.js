// basically only 4 routes, that call elaborate function ballets lol
// functions will be pulled from game_controller
//
// start game -
//    get a random room, store mirror on front-end
//    find 10 questions and save them to our db copy of room
//
// end game -
//    empty questions from db of our room
//    store user scores?
//    call startGame again?
//
// start a turn -
//    (get 1 question) from db
//
// end a turn -
//    (check if user's answer is correct)
//


'use strict';

let express     = require('express'),
    router      = express.Router(),
    request     = require('request'),
    bodyParser  = require('body-parser'),
    Question    = require('../models/question'),
    Room        = require('../models/room');

// define functions here from controller:
// let blah     = r,
//     blee     = a,
//     etc      = m;


// this needs to start the function ballet that uses the next routes:
router.route('/start')
   .get(room.fetchRoom(req.params.roomName))

   // these routes are triggered by functions from calling /start
   // see game_controller

   // fetch random room
   router.get('/randomRoom', (req, res) => {
      let rooms = [
         "History", "Math", "Science", "Computers and Coding", "Language and Logic", "Sports", "Business and Finance", "Movies"
      ];
      let index = Math.ceil(Math.random()*rooms.length)
   	Room.nameIs(rooms[index], (err, roomObj) => {
   		res.send(roomObj);
   	});
   });

   // fetch room by name
   router.get('/:roomName', (req, res) => {
      Room.nameIs(req.params.roomName, (err, roomObj) => {
   		res.send(roomObj);
   	});


   // store question to our db to validate
   router.route('/question/:params')
      .post(question.create);

   // purge our db
   router.route('/question/:params')
      .delete(question.delete);

   // get one question using info from roomName
   router.route('/question/get/:roomName')
      .get(room.functionName(req.params.roomName,index))

   // update room to clear questions
   router.route('/end/:roomName')
      .put(room.resetRoom(req.params.roomName));

module.exports = router;
