const express = require("express");
const router = express.Router();

const accountController = require("../controllers/accountController");
const userController = require("../controllers/userController");

router.get('/', userController.IsAuthenticated, accountController.GetAllAccounts);
router.post('/signin', accountController.SignIn);

module.exports = router;

// GET /accounts/
// POST /accounts/signin/