const express = require('express');
const router = express.Router();
const helpers = require('../common/helpers');

const controller = require('../controllers/index');

router.get('/:user_id', controller.userController.IsAuthenticated, helpers.catchAsync(controller.messageController.getAll));
router.get('/:user_id/latest', controller.userController.IsAuthenticated, helpers.catchAsync(controller.messageController.getMessageLatest));
router.get('/:user_id/read/:id', controller.userController.IsAuthenticated, helpers.catchAsync(controller.messageController.getMessageById));
router.post('/:user_id/send/:to_user_id', controller.userController.IsAuthenticated, helpers.catchAsync(controller.messageController.addNewmessage));


module.exports = router;

