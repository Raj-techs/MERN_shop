const mongoose = require("mongoose")

const userReq = new mongoose.Schema(
    {
        username:{
            type:String
        },
      group: {
        type: String,
        required: true,
      },
      userLocation: {
        type: String,
        required: true,
      },
      units: {
        type: String,
        required: true,
      },
      mobileNo: {
        type: Number,
        required: true,
      },
      bankName: {
        type: String,
        required: true,
      },
      bankLocation: {
        type: String,
        required: true,
      },
      bankmobileNo: {
        type: String,
        required: true,
      },
      certificates: {
        type: String,
        // required: true,
      },
  
      stamps: {
        type: String,
        // required: true,
      },
      doctorName: {
        type: String,
      },
      
    },
    // { timestamps: true }
  );
  
  const UserReq = mongoose.model("UserReq", userReq);
  
  module.exports = UserReq;
  