const mongoose = require("mongoose")

const RequestSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    group: {
      type: String,
      required: true,
      unique: true,
    },
    units: {
      type: Number,
      required: true,
      unique: true,
    },
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    certificates: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const requestUser = mongoose.model("requests", RequestSchema);

module.exports=  requestUser