const mongoose=require('mongoose');

require('dotenv').config();

const mongoURI = `mongodb://localhost:27017/Found_It`;

const connectToMongo=()=>{
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true},      
).then((link) => {
  console.log("Connected to mongo successfully")
})
.catch(() => {
  console.log("Database not connected.");
})
}

module.exports=connectToMongo;