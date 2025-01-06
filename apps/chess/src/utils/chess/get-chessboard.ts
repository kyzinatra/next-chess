import { Chessboard } from "@/libs/chess/chess.lib";

let chessboard: Chessboard | null = null;
export function getChessboard() {
	if (chessboard === null) {
		chessboard = new Chessboard();
	}

	return chessboard;
}
