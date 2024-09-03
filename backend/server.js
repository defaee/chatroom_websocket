const http = require("http");
const WebSocket = require("ws");

const server = http.createServer();

const ws = new WebSocket.Server({ server });

ws.on("connection", (socket) => {
  console.log("runned");

  socket.on("message", (data) => {
    console.log("msg", data.toString());

    ws.clients.forEach((client) => {
      client.send(data.toString());
    });
  });
});

server.listen(9000, () => {
  console.log("server runned on port 9000 successfully");
});
