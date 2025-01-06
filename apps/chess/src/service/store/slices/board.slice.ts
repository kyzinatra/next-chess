import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_ORIENTATION } from "@repo/constants";
import { Color, TField } from "@repo/constants/types";
import { getChessField } from "@utils/chess/get-field";
import { PieceSymbol, Square } from "chess.js";

//? Доска с полями. К ним автоматически подвязаны фигуры
interface IInitialState {
	squares: TField[][];
	board: ({
		square: Square;
		type: PieceSymbol;
		color: Color;
	} | null)[][];
	turn: Color;
	orientation: Color;
	active: TField | null;
	history: string[] | null;
}

const initialState: IInitialState = {
	//? это для рендера клеток
	squares: getChessField(DEFAULT_ORIENTATION),
	//? это для расположения фигур
	board: [],
	orientation: DEFAULT_ORIENTATION,
	turn: "w",
	active: null,
	history: null,
};

const slice = createSlice({
	name: "board",
	initialState: initialState,
	reducers: {
		setActive(s, p: PayloadAction<TField | null>) {
			s.active = p.payload;
		},
		setBoard(s, p: PayloadAction<IInitialState["board"]>) {
			s.board = p.payload;
		},
		setTurn(s, p: PayloadAction<Color>) {
			s.turn = p.payload;
		},
		setOrientation(s, p: PayloadAction<Color>) {
			s.orientation = p.payload;
			s.squares = getChessField(p.payload);
		},
		setHistory(s, p: PayloadAction<string[]>) {
			s.history = p.payload;
		},
	},
});

export const boardReducer = slice.reducer;
export const { setBoard, setActive, setTurn, setOrientation, setHistory } = slice.actions;
