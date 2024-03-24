const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    usrname:{
        type:String,
        require:true
    },
    msg:{
        type:String,
        require:true
    }
})


const chatData=new mongoose.model("chatData",schema)
module.exports=chatData




