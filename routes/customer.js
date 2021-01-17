const express = require("express");
const router = express.Router();

const controller = require("../controllers/index");

router.get("/getall", controller.customerController.GetAllCustomers);
router.post("/getbyid", controller.customerController.GetCustomerById);
router.post(
  "/create",
  controller.userController.IsAuthenticated,
  controller.customerController.AddNewCustomer
);
router.post(
  "/update",
  controller.userController.IsAuthenticated,
  controller.customerController.UpdateCustomer
);
router.post(
  "/getallbyfilter",
  controller.userController.IsAuthenticated,
  controller.customerController.GetCustomersByFilter
);

module.exports = router;
// GET /customer/all
// GET /customer/one
// POST /customer/ (ADD NEW CUSTOMER)
