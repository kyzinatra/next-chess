import { TField } from "@repo/constants/types";
import { useCallback } from "react";

import { getChessboard } from "../chess/get-chessboard";

import { Chessboard } from "@/libs/chess/chess.lib";
import { sendMove } from "@/service/store/middlewares/room.middleware";
import { setBoard, setTurn, setHistory } from "@/service/store/slices/board.slice";
import { setLastMove, setPreMove } from "@/service/store/slices/last-move.slice";
import { setMoves } from "@/service/store/slices/moves.slice";
import { setPromotion } from "@/service/store/slices/promotion.slice";
import { useAppDispatch } from "@/service/store/store";

export function useMove() {
	const chess = getChessboard();
	const dispatch = useAppDispatch();

	const move = useCallback(
		(from: TField, to: TField, promotion?: "q" | "r" | "n" | "b") => {
			if (from === to) {
				return;
			}
			if (!chess.isValidMove(from, to)) return;

			if (chess.isNeedPromotion(from, to) && !promotion) {
				return dispatch(setPromotion([from, to]));
			}

			const params = {
				from,
				to,
				promotion,
			};
			const move = chess.board.move(params);

			//? Optimistic and offline mode
			dispatch(setBoard(chess.board.board()));
			dispatch(setTurn(chess.board.turn()));
			dispatch(setLastMove([move.from, move.to]));
			dispatch(setHistory(chess.board.history()));

			//? send to server
			dispatch(sendMove(params));
		},
		[chess, dispatch]
	);

	const getMoves = useCallback(
		(field: TField) => {
			const moves = chess.board.moves({
				square: field,
			});
			const castling = Chessboard.getCastlingMove(field, moves);

			dispatch(setMoves(moves.concat(castling)));
			dispatch(setPreMove(field));
		},
		[chess.board, dispatch]
	);

	return [move, getMoves] as const;
}
