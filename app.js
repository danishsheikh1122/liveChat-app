require("./db/conn");

const express = require("express");
const path = require("path");
const http = require("http");
const app = express();
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 8000;
// const axios = require('axios');
// const cheerio = require('cheerio');
const chatData = require("./model/schema");
// const { copyFileSync } = require("fs");
// const { all } = require("axios");
const staticPath = path.join(__dirname, "./public");

const allMessagesContainer = [];

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("message", (data) => {
    //(data,name) get user name from here
    io.emit("chat message", data);
    // save_data()
    allMessagesContainer.push({
      name: "username",
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
    allMessagesContainer.push({
      name: "username",
      message: "msg",
    });
    allMessagesContainer.forEach(async (elem) => {
      console.log(elem);
      console.log(elem.message);
      const tostoredata = new chatData({
        usrname: "danish",
        msg: elem.message,
      });
      const saved = await tostoredata.save();
      console.log(saved);
      console.log("Saved");
    });
    // console.log(allMessagesContainer);
    allMessagesContainer.length=0 //emptys the array 
    // console.log(allMessagesContainer);
      // res.status(200).send({ "data saved": allMessagesContainer });
      // res.send({ok:"ok"})
      return res.status(200).send("data saved")
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
