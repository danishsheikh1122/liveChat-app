disconnect", () => {
    console.log("diconnected");
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/savedata", (req, res) => {
  // try{
  const allmsg = req