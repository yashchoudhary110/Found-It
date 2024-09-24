const mongoose=require('mongoose');

require('dotenv').config();

// const mongoURI = `mongodb://localhost:27017/Found_It`;
const mongoURI = `mongodb+srv://yashchoudhary572001:2ONDs5kzRSWUaO35@cluster0.m6uqr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


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