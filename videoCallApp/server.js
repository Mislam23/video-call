const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.send("Hi world!")
});

app.listen(4000 , ()=>{
  console.log("Server is running on port 4000");
});

