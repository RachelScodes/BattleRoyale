'use strict';
let mongoose = require('mongoose');
let Category = require('./category.js');
///// end requirements /////////////////////////////////////////////////////////

let QuestionSchema = new mongoose.Schema({
	// fields straight from api
   text: String,
   choice_1: String,
   choice_2: String,
   choice_3: String,
   choice_4: String,
   answer: Number,
   cat_name: String,
});

let Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
