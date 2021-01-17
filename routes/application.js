const express = require("express");
const router = express.Router();

const controller = require("../controllers/index");

router.get("/getall", controller.appController.GetAllApplications);
router.post("/getbyid", controller.appController.GetApplicationById);
router.post(
  "/create",
  controller.userController.IsAuthenticated,
  controller.appController.AddNewApplication
);
router.post(
  "/update",
  controller.userController.IsAuthenticated,
  controller.appController.UpdateApp
);
router.post(
  "/getallbyfilter",
  controller.userController.IsAuthenticated,
  controller.appController.GetAppsByFilter
);
router.post(
  "/updatebyagent",
  controller.userController.IsAuthenticated,
  controller.appController.UpdateApp
);

module.exports = router;
// GET /application/all
// GET /application/one
// POST /application/ (ADD NEW APPLICATION)
