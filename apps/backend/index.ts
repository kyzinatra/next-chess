import express from "express";
import { createServer } from "http";
import { Server } from "colyseus";
import { ChessRoom } from "./rooms/chess.room";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const gameServer = new Server({
	server: createServer(app),
});

gameServer.define("chess_room", ChessRoom);
console.log("Run ", +process.env.PORT! || 2567);

gameServer.listen(+process.env.PORT! || 2567);
