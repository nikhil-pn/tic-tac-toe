const express = require("express");

const app = express();
const server = require("http").Server(app);
const PORT = 3001;
const io = require("socket.io")(server);
const { v4: uuidv4 } = require("uuid");

//middlewars
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("");
});

app.get("/uuid", (req, res) => {
  res.redirect("/" + uuidv4());
});

app.get("/:room", (req, res) => {
  res.render("room", {
    roomId: req.params.room,
  });
});

server.listen(PORT, () => {
  console.log("server is running at port 3001");
});
