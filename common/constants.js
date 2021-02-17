let collections = {};

const collectionsName = {
  USER: "ez_users",
  MESSAGE: "ez_messages",
  PUSHER: "ez_pushers"
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
