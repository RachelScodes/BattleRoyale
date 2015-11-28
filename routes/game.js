// all the api calls happen here
// Generate an array of 10 random question/answer objects

'use strict';

let express  = require('express'),
    request  = require('request'),
    router   = express.Router(),
    mongoose = require('mongoose'),
    Room     = require('../models/room.js'),
    Question = require('../models/question.js'),
    unirest  = require('unirest');
///// require all the things because yolo //////////////////////////////////////

// variables
let room     = undefined;
let numsSelected = [];


// get room from our database using roomNum
// catNum is category number, from room
// catMax is max questions (for random), from room.
// randoNum ensures questions are random and unique
router.get('/categoryPull/:roomNum', (req, res) => {
   // find the room in our db that matches the current room
   room = Room.find({ 'div_id' : req.params.roomNum });
   numsSelected = [];
   // we need 10 questions in here
   let questionsArray = [];

   // choose 10 category numbers from list in room
   let catList = room.categories
   let categories = [];

   // iterator
   let i = 0;

   while(i < 10) {
      i += 1;
   }

   // random page number for that category search
   let randoNum = getRandom();

   res.send(questionsArray);
});

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
               var question = new Question(JSON.parse(result.raw_body)[0]);
               question.save(function(err) {
                  if (err) {
                     // bad question
                  } else {
                     // save to array
                     array.push(question);
                  }
               })
            }
         }
      })
   }

   // when we have enough questions, send them to game.
   console.log(array);
   return array
}

let getUrl = function(cNum,pNum){
   console.log('4. page num: '+ pNum);
   let base = "https://pareshchouhan-trivia-v1.p.mashape.com/v1/getQuizQuestionsByCategory?categoryId=";
   return base + cNum + "&limit=1&page=" + pNum;
}


let getRandom = function(max){
   let test = true;
   while (test){
      let randoNum = Math.floor(Math.random() * max) + 1;
      if (numsSelected.indexOf(randoNum) == -1) {
         numsSelected.push(randoNum);
         test = false
         return randoNum;
      }
   }
}


module.exports = getQuestions;
