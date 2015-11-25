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
let getQuestion = function(catNum, choices){
   console.log('2. inside getQuestions');
   let question = 'blank'
   // chosen at random
   let pageNum = getRandom(choices);
   // let's get them from the API
   unirest.get(getUrl(catNum,pageNum))
   .header("X-Mashape-Key", "lX0iJk5iGlmshE7fTOCtRf7hsj3Zp1NuuosjsnBKj4jIROPs9R")
   .header("Accept", "application/json")
   .end(function(result){
      // did we get a question?
      if (result.body && (result.body.length > 1)) {
         console.log('4. result',result.raw_body[0])
         // save the question after parsing as json
         question = new Question(JSON.parse(result.raw_body)[0])
         question.save(function(err) {
            if (err) {
               // bad question
               return 'nope'
               console.log('4. whoops')
            } else {
               // save to array
               console.log('4. Question: ',question)
               // array.push(question);
               return question
            }
         })
      }
      return 'failed request'
   })
   return 'ayfkm'
}

let getUrl = function(catID,rNum){
   console.log('3. page num: '+ rNum);
   let base = "https://pareshchouhan-trivia-v1.p.mashape.com/v1/getQuizQuestionsByCategory?categoryId=";
   return base + catID + "&limit=1&page=" + rNum;
}


let getRandom = function(max){
   let pages = [];
   let test = true;
   while (test){
      let randoNum = Math.floor(Math.random() * max) + 1;
      if (pages.indexOf(randoNum) == -1) {
         pages.push(randoNum);
         test = false
         return randoNum;
      }
   }
}


module.exports = getQuestion;
