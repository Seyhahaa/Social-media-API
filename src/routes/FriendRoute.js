const express = require('express');
const friendController = require('../controller/FriendController');
const router = express.Router();

router.post('/add-un-friend', friendController.addUnFriend);
router.get('/get-all-not-friend/:id', friendController.getAllorNotFriend);

module.exports = router;