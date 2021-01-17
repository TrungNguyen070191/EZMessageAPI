const express = require('express');
const router = express.Router();

const controller = require('../controllers/index');

router.get('/all', controller.productController.GetAllProducts);
router.post('/detail', controller.productController.GetProductDetail);
router.post('/category', controller.productController.GetProductByCategory);
router.post(
  '/uploadImage',
  controller.userController.IsAuthenticated,
  controller.productController.AddImageToDirectory,
  controller.productController.uploadImage
);
router.post(
  '/',
  controller.userController.IsAuthenticated,
  controller.productController.AddNewProduct
);

module.exports = router;
// GET /product/all
// POST /product/ (ADD NEW PRODUCT)
