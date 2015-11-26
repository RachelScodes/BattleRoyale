'use strict';

let express  = require('express'),
    request  = require('request'),
    router   = express.Router(),
    getQuestions = require('../routes/game.js').getQuestions,
    nextQuestion = require('../routes/game.js').nextQuestion,
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

// router is the function being exported.
module.exports = router;
