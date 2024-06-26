const jwt=require('jsonwebtoken');
const User=require('../models/User');
require('dotenv').config();
const JWT_secret=process.env.JWT_SECRET_KEY;

const fetchuser=async (req, res, next)=>{
  const auth_token=req.header('auth_token');
  if(!auth_token){
    res.status(401).json({from:"fethcUser", message:"You are not loggedin!!!!"});
    return;
  }
  try {
    const user_data=jwt.verify(auth_token, JWT_secret);
    req.user_id=user_data.user; // this is user id we have at the time of generating web token

    const user=await User.findById(req.user_id);
    if(!user){
      return res.status(401).json({success:false, message:"User not Find", from:"FetchUser middleware"});
    }
    if(user.isBlocked || !user.verified){
      return res.status(401).json({success:false, message:"User is Either Blocked or Email Not Verified", from:"FetchUser middleware"});
    }
    next();
  } catch (error) {
    res.status(500).json({from:"fethcUser", message:"catch: fetch User middleware"});
  }
}

module.exports=fetchuser;