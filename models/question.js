'use strict';
let mongoose = require('mongoose');
///// end requirements /////////////////////////////////////////////////////////

let QuestionSchema = new mongoose.Schema({
	// fields straight from api
   // q_category_id: Number,
   q_category_id: {type: Number, min: 1 },
   q_text: String,
   q_options_1: String,
   q_options_2: String,
   q_options_3: String,
   q_options_4: String,
   q_correct_option: Number,
   // q_difficulty_level: Number,
   q_difficulty_level: { type: Number, max: 2 },
   q_used: Date
});

QuestionSchema.pre('save', function(next) {
	let now = new Date();
	this.q_used = now;
	if ( !this.created_at ){
		this.created_at = now;
	}
	next();
});

let Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
