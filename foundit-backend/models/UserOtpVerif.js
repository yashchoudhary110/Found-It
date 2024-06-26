const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserOtpVerif= new schema({
    userId : String,
    otp:String, 
    createAt: Date,
    expireAt:Date
});

const UserOtp = mongoose.model('UserOtp',UserOtpVerif);
module.exports = UserOtp;



