const express = require("express");
const router = express.Router();

const controller = require("../controllers/index");

router.get("/getall", controller.questionController.GetAll);
router.post("/getbyid", controller.questionController.GetById);
router.post(
  "/create",
  controller.userController.IsAuthenticated,
  controller.questionController.AddNew
);
router.post(
  "/update",
  controller.userController.IsAuthenticated,
  controller.questionController.Update
);
router.post(
  "/getallbyfilter",
  controller.userController.IsAuthenticated,
  controller.questionController.GetByFilter
);
router.post(
  "/delete",
  controller.userController.IsAuthenticated,
  controller.questionController.Delete
);

module.exports = router;
// GET /customer/all
// GET /customer/one
// POST /customer/ (ADD NEW CUSTOMER)
