import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TField } from "@repo/constants/types";

//? Желтая подсветка последнего хода и поля с взятой фигурой
interface IInitialState {
	lastMove: TField[];
	preMove: null | TField;
}

const initialState: IInitialState = {
	lastMove: [],
	preMove: null,
};

const slice = createSlice({
	name: "move-highlight",
	initialState: initialState,
	reducers: {
		setLastMove(s, p: PayloadAction<TField[]>) {
			s.lastMove = p.payload;
		},
		removeFirst(s) {
			s.lastMove = s.lastMove.slice(1);
		},
		setPreMove(s, p: PayloadAction<TField>) {
			s.preMove = p.payload;
		},
		clearPreMove(s) {
			s.preMove = null;
		},
	},
});

export const lastMoveReducer = slice.reducer;

export const { removeFirst, setLastMove, setPreMove, clearPreMove } = slice.actions;
