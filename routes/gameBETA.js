'use strict';

let express  = require('express'),
    request  = require('request'),
    router   = express.Router(),
    mongoose = require('mongoose'),
    Question = require('../models/question.js'),
    room     = [],
    unirest  = require('unirest'); //not needed
///// require all the things because yolo //////////////////////////////////////


// get question from API
let getQuestions = function(catNum, array){
   console.log('2. inside getQuestions');
      // we want 10 good questions
   for(var i = 0; i < 10; i++) {
      // chosen at random
      let pageNum = Math.ceil(Math.random()*30);
      // let's get them from the API
      unirest.get(getUrl(catNum,pageNum))
      .header("X-Mashape-Key", "lX0iJk5iGlmshE7fTOCtRf7hsj3Zp1NuuosjsnBKj4jIROPs9R")
      .header("Accept", "application/json")
      .end(function(result){
         // did we get a question?
         if (result.body.length >= 1) {
            // do we have too many?
            if (array.length < 10){
               // save the question after parsing as json
               var jsQuestion = JSON.parse(result.raw_body)[0]
               console.log("question is: ",jsQuestion);
               var mongoQuestion = new Question(jsQuestion);
               mongoQuestion.save(function(err) {
                  if (err) {
                     // bad question
                  } else {
                     // save to array
                     array.push(jsQuestion);
                  }
               })
            }
         }
      })
   }

   // when we have enough questions, send them to game.
   console.log('is this array blank?',array);
   return array
}



let getUrl = function(cNum,pNum){
   console.log('4. page num: '+ pNum);
   let base = "https://pareshchouhan-trivia-v1.p.mashape.com/v1/getQuizQuestionsByCategory?categoryId=";
   return base + cNum + "&limit=1&page=" + pNum;
}


module.exports = getQuestions;
