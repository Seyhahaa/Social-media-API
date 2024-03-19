const express = require('express');
const friendController = require('../controller/friendController');
const router = express.Router();

router.post('/add-un-friend', friendController.addUnFriend);
router.get('/get-all-not-friend/:id', friendController.getAllorNotFriend);

module.exports = router;