const express = require("express");
const router = express.Router();

const routes = require("./index.js");

router.use("/auth", routes.authRoutes);
router.use("/product", routes.productRoutes);
router.use("/category", routes.categoryRoutes);
router.use("/blog", routes.blogRoutes);
router.use("/contact", routes.contactRoutes);
router.use("/application", routes.applicationRoutes);
router.use("/customer", routes.customerRoutes);
router.use("/question", routes.questionRoutes);

module.exports = router;
