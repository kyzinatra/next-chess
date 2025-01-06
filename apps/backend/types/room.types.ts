import { Square } from "chess.js";

export interface IChessRoomOptions {
	private?: boolean;
	color: "w" | "b" | "r"; // white | black | random
}
