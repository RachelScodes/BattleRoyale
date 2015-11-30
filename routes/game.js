'use strict';

let express = require('express');
let router = express.Router();
let room = require('../controllers/roomController');
let question = require('../controllers/qController')

/* so fresh and so clean! */

router.route('/start/:roomName')
   .get(room.fetchRoom(req.params.roomName))

router.route('/end/:roomName')
   .put(room.updateRoom(req.params.roomName));

router.route('/question/get/:roomName/:index')
   .get(room.fetchQuestion(req.params.roomName,index))
  //  router.route('/user/signup')

router.route('/question/new')
   .post(question.create);

router.route('/question/new')
   .post(question.create);

module.exports = router;
