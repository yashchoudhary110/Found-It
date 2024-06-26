const mongoose=require('mongoose');
const {Schema}=mongoose;

const notesSchema=new Schema({
  user_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  user_name:{
    type:String,
    required:true
  },
  notes_name:{
    type:String,
    required:true
  },
  file_name:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  },
  description:{
    type:String
  },
  
  is_reported:{
    type:Boolean,
    default:false
  },
  likes:{
    type:Number,
    default:0
  }
});

module.exports=mongoose.model('notes', notesSchema);