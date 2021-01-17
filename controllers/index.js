const productController = require("./productController");
const userController = require("./userController");
const categoryController = require("./categoryController");
const blogController = require("./blogController");
const contactController = require("./contactController");
const appController = require("./appController");
const customerController = require("./customerController");
const questionController = require("./questionController");
const surveyController = require("./surveyController");

module.exports = {
  userController: userController,
  productController: productController,
  categoryController: categoryController,
  contactController: contactController,
  blogController: blogController,
  appController: appController,
  customerController: customerController,
  questionController: questionController,
  surveyController: surveyController
};
