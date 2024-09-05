const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer();

// const ws = new WebSocket.Server({ server });
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("msg", (data) => {
    const { msg, name } = data;

    io.emit("response", { msg, name });
  });
});

server.listen(9000, () => {
  console.log("server runned on port 9000 successfully");
});
