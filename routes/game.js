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
let getQuestions = function(catNum){
   console.log('inside getQuestions');
   let tenQuestions = [], // array of validated questions
       randoNum     = Math.ceil(Math.random()*10000); // random selection

   // run this until we have enough good questions
   if (tenQuestions.length < 10){
      unirest.get(getUrl(catNum))
      .header("X-Mashape-Key", "Nx6b43HFWUmshFvYztDKgsSev9gtp1LcyISjsnECbsti8VCWr7")
      .header("Accept", "application/json")
      .end(saveQuestions(catNum,result,tenQuestions))
   }
   // when we have enough questions, send them to game.
   console.log(tenQuestions);
   return tenQuestions
}

end function (){
   // set variable that is data
   // if it works, go up, if not, don't go up.
   // use set timeout
   // for(var i = 0)
}


// save valid api question to our database
let saveQuestions = function(num,object, array){
   console.log('result retrieved!');
   console.log(object.status, object.headers, object.body);
   var question = new Question(result.body);
   question.save(function(err) {
      if (err) {
         // if bad question, don't save
         console.log('noooope');
      } else {
         // if it's good, save it to array
         console.log(question);
         array.push(question)
      }
   }
   if (array.length < 10){
      getQuestions(num)
   }
   console.log(array);
   return array
}

let getUrl(number) = function{
   let base = "https://pareshchouhan-trivia-v1.p.mashape.com/v1/getQuizQuestionsByCategory?categoryId=";
   let randoNum = Math.ceil(Math.random()*10000);
   return base + number + "&limit=1&page=" + randoNum;
}


module.exports = getQuestions;
