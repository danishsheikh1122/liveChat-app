require("../db/conn");
const express = require("express");
const path = require("path");
const http = require("http");
const app = express();
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 8000;
const hbs=require("hbs")
const chatData = require("../model/schema");
const staticPath = path.join(__dirname, "./public");
console.log(staticPath);
const templatePath = path.join(__dirname, "../templates/views");

console.log(staticPath);
const cors=require("cors");
const allMessagesContainer = [];

app.use(cors({
    origin: '*'
}));

app.set("view engine" , "hbs");
app.set("views", templatePath);
app.use(express.static(staticPath))
app.use(express.urlencoded({ extended: false }))

app.use(express.json())//humesha likha chhaiye

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("message", (data,name) => {
    //(data,name) get user name from here
    io.emit("chat message", data,name);
    // save_data()
    allMessagesContainer.push({
      name,
      message: data,
    });
    // console.log(data); //cl current user message
    // console.log(data,name); print user name
  });

  socket.on("disconnect", () => {
    console.log("diconnected");
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/savedata", (req, res) => {
  // console.log(allMessagesContainer);
  try {
    // for verifying restapi
    // allMessagesContainer.push({
    //   name: "username",
    //   message: "msg",
    // });
    // above for rest api
    allMessagesContainer.forEach(async (elem) => {
      // console.log(elem);
      // console.log(elem.name);
      const tostoredata = new chatData({
        usrname: elem.name,
        msg: elem.message,
      });
      const saved = await tostoredata.save();
      // console.log(saved);
      // console.log("Saved");
    });
    // console.log(allMessagesContainer);
    allMessagesContainer.length=0 //emptys the array 
    // console.log(allMessagesContainer);
      // res.status(200).send({ "data saved": allMessagesContainer });
      // res.send({ok:"ok"})
      return res.status(200).send("data saved")
        // return res.status(200).render("index")        
  } catch (err) {
    // res.send({ err: err });
    return res.status(400).send(err)
  }
});

app.get("/api/savedata",async(req,res)=>{
  const to_give_data=await chatData.find()
  res.status(200).send(to_give_data)
})

server.listen(port, () => {
  console.log("listening");
});
