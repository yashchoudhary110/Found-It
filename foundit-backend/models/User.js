const mongoose=require('mongoose');
const { Schema } = mongoose;
const {roles}=require('../roles');

const Userschema = new Schema({
  name:  {
    type:String,
    required:true
  }, 
  email:  {
    type:String,
    required:true,
    unique:true
  }, 
  password:  {
    type:String,
    required:true
  },
  mobile_no:{
    type:String,
    required:true,
    unique:true
  },
  user_image:{
    type:String,
    required:true
  },
  public_id:{
    type:String,
    required:true
  },
  department:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  },
  gender:{
    type:String,
    required:true
  },
  role:{
    type:String,
    enum:[roles.ADMIN, roles.CLIENT],
    default:roles.CLIENT
  },
  isBlocked:{
    type:Boolean,
    default:false
  },
  verified:{
    type:Boolean,
    default:false
  }
});

module.exports=mongoose.model('user', Userschema);