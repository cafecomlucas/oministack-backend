const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

const server = require("http").Server(app);
const io = require("socket.io")(server);
io.on("connection", socket => {
  console.log("ok");
  socket.on("connectRoom", box => {
    socket.join(box);
  });
});

mongoose.connect(
  "mongodb+srv://oministackUser:oministackPass@cluster0-ztvhr.mongodb.net/oministack?retryWrites=true",
  { useNewUrlParser: true }
);

app.use((req, res, next) => {
  req.io = io;
  return next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes"));
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

server.listen(3333);