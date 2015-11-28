'use strict';

let express  = require('express'),
    request  = require('request'),
    router   = express.Router(),
    getQuestions = require('../routes/game.js').getQuestions,
    nextQuestion = require('../routes/game.js').nextQuestion;
///// end requirements ////////////////////////////////////////////////////////

// the '/' means '/game, see server.js'
// start and end game. enter/exit room.
router.route('/:room')
   .get((req, res, next) =>{
      console.log('1. hit get /',req.params.room);
      console.log('this starts the game and gets the questions');
      let info = getQuestions();
      res.send(info)
  })
   .post((req, res, next) => {
      console.log('1. hit post /',req.params.room,', registers end of game, wipe everything.');
      console.log('this shows the users scores and adds stats to account');
   });

// start and end turn. stay within room.
router.route('/:room/:turn')
   .get((req, res, next) =>{
      console.log('1. hit get /',req.params.room,'/',req.params.turn);
      console.log('this shows 1 question and its 4 answers for turn number: ',req.params.turn);
      let info = nextQuestion();
      res.send(info)
  })
   .post((req, res, next) => {
      console.log('1. hit post /turn, register user input');
      console.log('this calculates the users\' scores and shows all scores');
   });

// take room on or offline
// router.route('/change/:room/:in_play')
//    .post((req,res,next) => {
//       let playState = req.params.in_play
//       if (playState == 'true'){
//          console.log('save the room status so people don\'t join midstream');
//          takeRoomOff(req.params.room,true)
//       } else {
//          console.log('game is over. put room back in play.');
//          takeRoomOff(req.params.room,false)
//       }
//       console.log('room status changed');
//    })

// // pseudo-code
// function takeRoomOff(roomName,in_play) {
//    let thisRoom = Room.find({'title'})
//    thisRoom.in_play = in_play
//    thisRoom.update.
// }



// router is the function being exported.
module.exports = router;
