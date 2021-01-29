const express = require('express');
const router = express.Router();

const controller = require('../controllers/index');

router.post('/update-token', controller.pusherController.updateToken);
// router.post('/get-tokens', );
// router.post('/send',);
// router.get('/getNotification', controller.pusherController.getNotification);

module.exports = router;