import { createAction, Middleware } from "@reduxjs/toolkit";
import { ROOM_ACTIONS } from "@repo/constants";
import { Color, TField, TMakeMove } from "@repo/constants/types";
import { Room } from "colyseus.js";

import { setBoard, setHistory, setOrientation, setTurn } from "../slices/board.slice";
import { setLastMove } from "../slices/last-move.slice";
import { setRoomId } from "../slices/rooms.slice";

import { getChessboard } from "@/utils/chess/get-chessboard";
import { getRoomClient } from "@/utils/rooms/get-rooms-clients";

export const createRoom = createAction("room/create");
export const joinRoom = createAction<string>("room/join");
export const disconnectRoom = createAction("room/disconnect");
export const sendMove = createAction<TMakeMove>("room/send_move");

export const roomMiddleware: (roomName: string, actions: typeof ROOM_ACTIONS) => Middleware = (
	roomName,
	actions
) => {
	return (api) => {
		const client = getRoomClient();
		const chessboard = getChessboard();
		let currentRoom: Room | null = null;

		return (next) => (action) => {
			if (createRoom.match(action) || joinRoom.match(action)) {
				if (currentRoom) return;
				let roomPromise = null;

				if (createRoom.match(action)) roomPromise = client.create(roomName, { color: "r" });
				else roomPromise = client.joinById(action.payload, { color: "r" });

				roomPromise?.then((room) => {
					if (!room) return;
					currentRoom = room;

					api.dispatch(setRoomId(room.id));

					room.onMessage(actions.board, (b: string) => {
						chessboard.board.load(b);
						api.dispatch(setBoard(chessboard.board.board()));
					});
					room.onMessage(actions.turn, (t: Color) => api.dispatch(setTurn(t)));
					room.onMessage(actions.lastMove, (m: TField[]) => api.dispatch(setLastMove(m)));
					room.onMessage(actions.orientation, (o: Color) => api.dispatch(setOrientation(o)));
					room.onMessage(actions.history, (h: string[]) => api.dispatch(setHistory(h)));
				});
				return;
			}

			if (sendMove.match(action) && currentRoom) {
				currentRoom.send(actions.move, action.payload);
				return;
			}

			if (disconnectRoom.match(action)) {
				currentRoom?.leave();
				currentRoom = null;
				api.dispatch(setRoomId(null));
				return;
			}
			next(action);
		};
	};
};
