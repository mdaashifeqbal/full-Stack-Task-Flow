const mongoose=require("mongoose");

module.exports=mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("database connected successfully");
}).catch((err)=>{
    console.log(`problem on connecting to database ${err.message}`);
})