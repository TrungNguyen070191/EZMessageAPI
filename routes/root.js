const express = require("express");
const router = express.Router();

const routes = require("./index");

router.use("/users", routes.userRoutes);
// router.use("/auth", routes.authRoutes)
router.use("/messages", routes.messageRoutes);
router.use("/pusher", routes.pusherRoutes);


module.exports = router;
