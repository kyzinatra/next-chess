/* eslint-disable react-compiler/react-compiler */
"use client";
import { FC, PropsWithChildren, useRef } from "react";
import { Provider } from "react-redux";

import { setBoard } from "@/service/store/slices/board.slice";
import { makeStore, AppStore } from "@/service/store/store";
import { getChessboard } from "@/utils/chess/get-chessboard";

export const ReduxProvider: FC<PropsWithChildren> = ({ children }) => {
	const storeRef = useRef<AppStore>(null);
	if (!storeRef.current) {
		storeRef.current = makeStore();
		const chess = getChessboard();
		storeRef.current.dispatch(setBoard(chess.board.board()));
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
};
