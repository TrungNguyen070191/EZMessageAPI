let collections = {};

const collectionsName = {
  ACCOUNT: "cb_account",
  USER: "cb_user",
  PRODUCT: "cb_product",
  CATEGORY: "cb_category",
  BLOG: "cb_blog",
  CONTACT: "cb_contact",
  APPLICATION: "cb_application",
  CUSTOMER: "cb_customer",
  SURVEY: "cb_survey"
};

const role = {
  ADMIN: 1,
  USER: 0
};

const status = {
  NEW: 0,
  SECONDHAND: 1
};

collections.collectionsName = collectionsName;
collections.role = role;
collections.status = status;

module.exports = collections;
