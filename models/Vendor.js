const mongoose = require("mongoose")
let VendorSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    Firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Firm"
        }
    ]
})
const Vendor=mongoose.model("vendor",VendorSchema)
module.exports = Vendor