// api link
// https://pareshchouhan-trivia-v1.p.mashape.com/v1/getRandomQuestion

'use strict';

let express  = require('express'),
    request  = require('request'),
    router   = express.Router(),
    mongoose = require('mongoose'),
    Question = require('../models/question.js'),
    room     = [],
    unirest  = require('unirest'); //not needed
///// end requirements ////////////////////////////////////////////////////////


// the '/' means '/game, see server.js'
router.route('/')
   .get((req, res, next) =>{
      console.log('hit get /game');
      // send array of questions
      res.send(getQuestions(categoryNum))
  })
   .post((req, res, next) => {
      // check user response
      console.log('hit post /game, register response')
      // show score for user

   });

// router is the function being exported.
module.exports = router;
