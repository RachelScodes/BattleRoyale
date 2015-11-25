// api link
// https://pareshchouhan-trivia-v1.p.mashape.com/v1/getRandomQuestion

'use strict';

let express  = require('express'),
    request  = require('request'),
    router   = express.Router(),
    mongoose = require('mongoose'),
    Question = require('../models/question.js'),
    getQuestion = require('../routes/testMe.js'),
    async = require('async');
    unirest  = require('unirest'); //not needed
///// end requirements ////////////////////////////////////////////////////////


let categoryNum = 119; // "Coding & Decodin"

// the '/' means '/game, see server.js'
router.route('/')
   .get((req, res, next) =>{
      console.log('1. hit get /game');
      // let questions = getTen(categoryNum, 30)
      let question = getQuestion(categoryNum, 30)

      console.log('sending to page');
      res.send(categoryNum + question)
  })
   .post((req, res, next) => {
      // check user response
      console.log('hit post /game, register response')
      // show score for user

   });

let getTen = function(num,int){
   let blankArray = [];
   let questionArray = [];
      while (questionArray.length < 10){
         let q = getQuestion(num, int)
         if (q != 'nope') {
            questionArray.push();
         }
      }
   return questionArray
}


// router is the function being exported.
module.exports = router;
