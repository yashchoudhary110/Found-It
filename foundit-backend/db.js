const mongoose=require('mongoose');

require('dotenv').config();

const mongoURI = `mongodb://YashChoudhary:Yash118@ac-ottpzcc-shard-00-00.omupajy.mongodb.net:27017,ac-ottpzcc-shard-00-01.omupajy.mongodb.net:27017,ac-ottpzcc-shard-00-02.omupajy.mongodb.net:27017/?ssl=true&replicaSet=atlas-ttrcrl-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`;

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