'use strict';
let mongoose = require('mongoose');
///// end requirements /////////////////////////////////////////////////////////

let CategorySchema = new mongoose.Schema({
   api_id: Number,
   title: String,
   max_qs: Number
});

let Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
