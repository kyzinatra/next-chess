import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//? Доступные ходы
interface IInitialState {
	moves: string[] | null;
}

const initialState: IInitialState = {
	moves: null,
};

const slice = createSlice({
	name: "moves",
	initialState: initialState,
	reducers: {
		setMoves(s, p: PayloadAction<string[]>) {
			s.moves = p.payload;
		},
		clearMoves(s) {
			s.moves = null;
		},
	},
});

export const movesReducer = slice.reducer;
export const { setMoves, clearMoves } = slice.actions;
