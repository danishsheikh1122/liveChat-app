const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/livechat")//will create new or if exist then use it 

const db=mongoose.connection
db.on('connected',()=>{
    console.log("connected");
})
db.on("error",()=>{
    console.log("error");
})
