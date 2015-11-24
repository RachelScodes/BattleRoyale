'use strict'
let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

let userSchema = new mongoose.Schema({
  fullname: {type: String},
  username: {type: String},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  player_since:{type: Date, default: Date.now}
});

////////////////////////////////////////////////////////////////////////////////
userSchema.pre('save', function(next) {
  let currentUser = this;
  if (!user.isModified('password')) return next(); ///// if password new/modified hash password
  bcrypt.genSalt(5, (err, salt) => { ///// generate salt
    if (err) return next(err);
    bcrypt.hash(currentUser.password, salt, (err, hash) => { ///// salt password
      if (err) return next (err);
      currentUser.password = hash;
      next();
    });
  });
});

userSchema.methods.authenticate = function(password, callback) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    callback(null, isMatch);
  });
};
////////////////////////////////////////////////////////////////////////////////


module.exports = mongoose.model('User', userSchema);
