"use strict";

var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

/**
 * App Schema
 */

var SurveySchema = new Schema({
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
  listQuestion: [
    {
      id: String,
      content: String,
      type: String,
      choice: String,
      answerList: [
        {
          code: String,
          content: String
        }
      ]
    }
  ],
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

var SurveyModel = mongoose.model("Survey", AppSchema);

module.exports = SurveyModel;
