'use strict'

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
RoomSchema.statics.nameIs = function(name,cb) {
   this.db.model('Room').findOne({ name: new RegExp(name, 'i') },cb);
}
RoomSchema.statics.isOpen = function(cb){
   this.db.model('Room').find({selectable: true }, cb);
}

// these should be instance methods but I could NOT get them to work!
RoomSchema.statics.closeThisRoom = function(name,cb){
   this.db.model('Room').findOneAndUpdate({ name: name }, { selectable: false },cb);
}
RoomSchema.statics.openThisRoom = function(name,cb){
   this.db.model('Room').findOneAndUpdate({ name: name }, { selectable: true },cb);
}

// open and close room via instance methods unsuccessful
// RoomSchema.methods.openRoom = function() {
//    this['questions'] = [];
//    this['selectable'] = true;
//    this.save()
// },
// RoomSchema.methods.closeRoom = function() {
//    this.selectable = false;
//    this.save()
   // ~~~when I log `this` here, it gives me the room with
   // ~~~selectable as false. but if i try to save it to a variable
   // ~~~i get undefined or null. `this` cannot be returned
   // ~~~and calling .isOpen() reflects no changes saved.
//    return 'closed room'
// }

let Room = mongoose.model('Room', RoomSchema);

module.exports = Room;


// successful class method test examples:
//
// Room.nameIs('History',function(err, result) {
//       console.log('.nameIs(\'History\',callback)');
//       console.log(result);
// })
//
// Room.isOpen(function(err, results) {
//    console.log('.isOpen(callback)');
//    let result = err
//    if (results) {
//       result = []
//       for (var i = 0; i < results.length; i++){
//          result.push(results[i]['name'])
//       }
//    }
//    console.log(result);
// });
//
// Room.closeThisRoom('Movies',function(err, rm) {
//   if (err){
//     console.log(err);
//   }
// });
