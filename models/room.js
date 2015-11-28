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
   selectable: {type: Boolean, default: true}
});

// assign search functions to the room model
// find by name, or find all open rooms.
RoomSchema.statics = {
   nameIs: function(name, cb) {
      return this.find({ name: new RegExp(name, 'i') }, cb);
   },
   isOpen: function(cb){
      return this.find({selectable: new RegExp(true, 'i') }, cb);
   }
};

// open and close room via...
RoomSchema.methods = {
   openRoom: function() {
      this.questions = [];
      this.selectable = true;
      this.save()
   },
   closeRoom: function() {
      this.selectable = false;
      this.save()
   }
};

let Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
