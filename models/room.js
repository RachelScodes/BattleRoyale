'use strict';
let mongoose = require('mongoose');
///// end requirements /////////////////////////////////////////////////////////

let RoomSchema = new mongoose.Schema({
   title: String,
   img_url: String,
   description: String,
   categories: Array,
   questions: Array,
   max_players: {type: Number, max: 10, min: 2, default: 6 },
   players: Array,
   // difficulty: { type: Number, max: 2 },
   in_play: Boolean
});

let Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
