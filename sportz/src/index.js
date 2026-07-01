import express from "express";
import http from "http";
import { matchRouter } from "./routes/matches.route.js";
import { attachWebSocketServer } from "./ws/server.js";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "0.0.0.0";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello form Express server");
});
app.use("/matches", matchRouter);

const { broadCastMatchCreate } = attachWebSocketServer(server);
app.locals.broadCastMatchCreate = broadCastMatchCreate;
server.listen(PORT, HOST, () => {
  const baseUrl =
    HOST === "0.0.0.0" ? `http://localhost:${PORT}` : `http://${HOST}:${PORT}`;
  console.log(`Server is running on ${baseUrl}`);
  console.log(
    `WebSocket server is running on ${baseUrl.replace("http", "ws")}/ws`,
  );
});
