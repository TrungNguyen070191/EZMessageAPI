const express = require("express");
const router = express.Router();

const controller = require("../controllers/index");

router.get("/all", controller.surveyController.GetAllSurveys);
router.post("/one", controller.surveyController.GetSurveyById);
router.post(
  "/",
  controller.userController.IsAuthenticated,
  controller.surveyController.AddNewSurvey
);

module.exports = router;
// GET /survey/all
// GET /survey/one
// POST /survey/ (ADD NEW SURVEY)
