'use strict'

let express = require('express');
let router = express.Router();
let user = require('../controllers/user_controller');
let expressJWT = require('express-jwt');
let config = require('../config');

let secret = config.secret;

///// protected user routes ////////////////////////////////////////////////////
router.route('/show')
// .all(expressJWT({
//   secret: secret,
//   userProperty: 'auth'
// }))
  .get(user.showAllUsers) ///// show all users


router.route('/edit') ///// needs more testing!
// .all(expressJWT({
//   secret: secret,
//   userProperty: 'auth'
// }))
  .put(user.editUser) ///// edit user


router.route('/delete') ///// needs more testing!
  // .all(expressJWT({
  //   secret: secret,
  //   userProperty: 'auth'
  // }))
  .delete(user.deleteUser) ///// delete user


///// unprotected user routes //////////////////////////////////////////////////
router.route('/signup')
  .post(user.createUser);

router.route('/authenticate') ///// essentially serves as login route - needs more testing!
  .post(user.auth);


// router.route('/user/logout') ///// may need to adjust route to /login alone
//   .post(user.login);





module.exports = router;
