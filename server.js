const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

let availabilities = [];

io.on("connection", (socket) => {
  socket.on("new-availability", (data) => {
    availabilities.push(data);
    const timeSlots = {};
    availabilities.forEach((p) => {
      p.slots.forEach((slot) => {
        timeSlots[slot] = (timeSlots[slot] || 0) + 1;
      });
    });
    io.emit("availability-updated", { timeSlots });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server running on port", PORT));
