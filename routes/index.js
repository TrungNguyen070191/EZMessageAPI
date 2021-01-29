const user = require("./users.js");
const message = require("./messages.js");
const pusher = require("./pushers.js");

module.exports = {
  userRoutes: user,
  messageRoutes: message,
  pusherRoutes: pusher, 
  // authRoutes: auth
};
