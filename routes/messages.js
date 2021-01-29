const express = require('express');
const router = express.Router();
const helpers = require('../common/helpers');

const controller = require('../controllers/index');

router.get('/:user_id', controller.userController.IsAuthenticated, controller.messageController.getAll);
router.post('/:user_id', controller.userController.IsAuthenticated, controller.messageController.addNewmessage);
router.get('/:user_id/latest', controller.userController.IsAuthenticated, controller.messageController.getMessageLatest);
router.get('/:user_id/read/:id', controller.userController.IsAuthenticated, helpers.catchAsync(controller.messageController.getMessageById));

module.exports = router;

