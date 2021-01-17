const express = require("express");
const router = express.Router();

const controller = require("../controllers/index");

router.get('/all', controller.blogController.GetAllBlogs);
router.post('/detail', controller.blogController.GetBlogDetail);
router.post('/category', controller.blogController.GetBlogByCategory);
router.post('/', controller.userController.IsAuthenticated, controller.blogController.AddNewBlog);

module.exports = router;
// GET /product/all
// POST /product/ (ADD NEW PRODUCT)