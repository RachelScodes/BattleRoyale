// api link
// https://pareshchouhan-trivia-v1.p.mashape.com/v1/getRandomQuestion

'use strict';

let express  = require('express'),
    router   = express.Router(),
    mongoose = require('mongoose');
   //  question = require('../models') //model for question
///// end requirements ////////////////////////////////////////////////////////


// the '/' means '/game, see server.js'
router.route('/')
   .get((req, res, next) =>{
      console.log('hit get /game');
      // get question from API

      // save api question to our database
      var question = new Artist(req.body);
      question.save(function(err) {
         if (err) {
            // if bad question, get another one
            // router.route('/').get(hitApi());
         } else {
            // render it for user
            res.send(question)
         }
      });
   })
   .post((req, res, next) => {
      // check user response
      console.log('hit post /game, register response')
      // show score for user

   });

// router is the function being exported.
module.exports = router;
