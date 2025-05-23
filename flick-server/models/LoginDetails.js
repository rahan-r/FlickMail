const mongoose = require("mongoose");

const loginDetailSchema = new mongoose.Schema({
  flickuserId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  verifiedAt: {
    type: Date,
    required: true,
  },
  identityType: {
    type: String,
    required: true,
  },
  identityValue: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  timezone: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("LoginDetail", loginDetailSchema);
