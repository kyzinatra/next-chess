import { configureStore, Tuple } from "@reduxjs/toolkit";
import { ROOM_ACTIONS } from "@repo/constants";
import { useDispatch, useSelector } from "react-redux";

import { roomMiddleware } from "./middlewares/room.middleware";
import { arrowsReducer } from "./slices/arrows.slice";
import { boardReducer } from "./slices/board.slice";
import { highlightReducer } from "./slices/highlight.slice";
import { lastMoveReducer } from "./slices/last-move.slice";
import { movesReducer } from "./slices/moves.slice";
import { promotionReducer } from "./slices/promotion.slice";
import { roomsReducer } from "./slices/rooms.slice";

export const makeStore = () =>
	configureStore({
		reducer: {
			promotion: promotionReducer,
			board: boardReducer,
			moves: movesReducer,
			lastMove: lastMoveReducer,
			highlight: highlightReducer,
			arrows: arrowsReducer,
			rooms: roomsReducer,
		},

		devTools: process.env.NODE_ENV === "development",
		middleware: () => new Tuple(roomMiddleware("chess_room", ROOM_ACTIONS)),
	});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
