// api link

'use strict';

let express  = require('express'),
    request  = require('request'),
    router   = express.Router(),
    getQuestions = require('../routes/game.js'),
///// end requirements ////////////////////////////////////////////////////////


// the '/' means '/game, see server.js'
router.route('/')
   .get((req, res, next) =>{
      console.log('1. hit get /game');
      res.send('got' )
  })
   .post((req, res, next) => {
      // check user response
      console.log('hit post /game, register response')
      // show score for user
   });

// router is the function being exported.
module.exports = router;
