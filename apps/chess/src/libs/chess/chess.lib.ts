import { ROWS } from "@repo/constants";
import { TField } from "@repo/constants/types";
import { Chess, Color, Piece } from "chess.js";

import { PIECES_ALTS } from "./chess.utils";

export class Chessboard {
	board: Chess;
	constructor() {
		this.board = new Chess();
	}

	isNeedPromotion(from: TField, to: TField): boolean {
		const piece = this.board.get(from);
		if (piece.type !== "p") return false;
		if (piece.color === "w" && to[1] === "8") return true;
		if (piece.color === "b" && to[1] === "1") return true;
		return false;
	}

	static getAlt({ type, color }: Piece) {
		return PIECES_ALTS[(color + type) as keyof typeof PIECES_ALTS];
	}

	static getCastlingMove(square: TField, moves: string[]): TField[] {
		const res: TField[] = [];
		if (moves.includes("O-O-O")) {
			res.push(square === "e1" ? "c1" : "c8");
		}
		if (moves.includes("O-O")) {
			res.push(square === "e1" ? "g1" : "g8");
		}
		return res;
	}

	static getColorByLabel(label: TField): Color {
		const [letter, number] = label.split("");
		const letterIndex = ROWS.findIndex((el) => el === letter);

		return (letterIndex + +number) % 2 ? "b" : "w";
	}

	isValidMove(from: TField, to: TField) {
		try {
			this.board.move({ from, to, promotion: "q" });
			this.board.undo();
			return true;
		} catch {
			return false;
		}
	}
}
