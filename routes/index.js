const account = require("./account.js");
const auth = require("./auth.js");
const product = require("./product.js");
const category = require("./category.js");
const blog = require("./blog.js");
const contact = require("./contact.js");
const application = require("./application.js");
const customer = require("./customer.js");
const question = require("./question.js");

module.exports = {
  accountRoutes: account,
  authRoutes: auth,
  productRoutes: product,
  categoryRoutes: category,
  blogRoutes: blog,
  contactRoutes: contact,
  applicationRoutes: application,
  customerRoutes: customer,
  questionRoutes: question
};
