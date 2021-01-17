const express = require("express");
const router = express.Router();

const controller = require("../controllers/index");

router.get('/all', controller.contactController.GetAllContacts);
router.post('/detail', controller.contactController.GetContactDetail);
router.post('/category', controller.contactController.GetContactByCategory);
router.post('/', controller.userController.IsAuthenticated, controller.contactController.AddNewContact);

module.exports = router;
// GET /product/all
// POST /product/ (ADD NEW PRODUCT)