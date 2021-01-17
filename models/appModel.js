"use strict";

var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

/**
 * App Schema
 */
var AppSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  type: {
    type: String,
    trim: true,
    required: true
  },
  idAssignee: String,
  createdDate: {
    type: Date,
    default: Date.now
  },
  assignedDate: {
    type: Date
  },
  completedDate: {
    type: Date
  },
  images: [
    {
      type: String,
      required: true
    }
  ],
  location: {
    latitude: String,
    longitute: String
  },
  status: String
});

var AppModel = mongoose.model("App", AppSchema);

module.exports = AppModel;
