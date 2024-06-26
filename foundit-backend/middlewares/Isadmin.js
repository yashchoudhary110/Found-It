const User=require('../models/User');

const Isadmin=async (req, res, next)=>{
  try {
    const user=await User.findById(req.user_id);
    if(user.role==="client" && user.email!==ADMIN_EMAIL){
      return res.status(401).json({success:false, message:"You are not allowed to do So!", from:"Isadmin middleware"});
    }
    next();
  } catch (error) {
    res.status(500).json({from:"fethcUser", message:error.message, from:"Isadmin middleware | Catch Section"});
  }
}

module.exports=Isadmin;