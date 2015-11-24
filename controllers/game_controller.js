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
      // get question from API
      unirest.get("https://pareshchouhan-trivia-v1.p.mashape.com/v1/getRandomQuestion")
         .header("X-Mashape-Key", "TBD")
         .header("Accept", "application/json")
         .end(function (result) {
           console.log(result.body);
         //   res.send(result.body)
         })
  })
   .post((req, res, next) => {
      // check user response
      console.log('hit post /game, register response')
      // show score for user

   });

// router is the function being exported.
module.exports = router;
