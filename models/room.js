'use strict';
let mongoose = require('mongoose');
///// end requirements /////////////////////////////////////////////////////////

let RoomSchema = new mongoose.Schema({
   name: String,
   img_url: String,
   desc: String,
   categories: Array,
   questions: Array,
   max_players: {type: Number, max: 10, min: 2, default: 6 },
   players: Array,
   ninja: String,
   // difficulty: { type: Number, max: 2 },
   in_play: Boolean
});

let Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
