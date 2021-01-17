const express = require("express");
const router = express.Router();

const controller = require("../controllers/index");

router.get('/all', controller.categoryController.GetAllCategories);
router.post('/detail', controller.categoryController.GetCategoryDetail);
router.post('/', controller.userController.IsAuthenticated, controller.categoryController.AddNewCategory);

module.exports = router;
// GET /product/all
// POST /product/ (ADD NEW PRODUCT)