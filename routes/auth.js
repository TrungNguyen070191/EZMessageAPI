const express = require("express");
const router = express.Router();

const controller = require("../controllers/index");

router.get(
  "/getall",
  controller.userController.IsAuthenticated,
  controller.userController.GetAllUsers
);
router.post("/create", controller.userController.Register);
router.post("/", controller.userController.create);
router.post("/GetToken", controller.userController.SignIn);
router.post(
  "/update",
  controller.userController.IsAuthenticated,
  controller.userController.UpdateUser
);
router.post(
  "/getbyid",
  controller.userController.IsAuthenticated,
  controller.userController.GetUserById
);
router.post(
  "/getallbyfilter",
  controller.userController.IsAuthenticated,
  controller.userController.GetAllUsersByFilter
);

module.exports = router;
// GET /auth/all
// POST /auth/register
// POST /auth/signin/
