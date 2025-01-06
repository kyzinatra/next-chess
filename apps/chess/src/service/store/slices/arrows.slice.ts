import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TField } from "@repo/constants/types";

//? Стрелки ходов [from, to][]
interface IInitialState {
	arrows: [TField, TField][];
	startArrow: null | TField;
}

const initialState: IInitialState = {
	arrows: [],
	startArrow: null,
};

const slice = createSlice({
	name: "arrows",
	initialState: initialState,
	reducers: {
		setStartArrow(s, p: PayloadAction<TField>) {
			s.startArrow = p.payload;
		},
		clearStartArrow(s) {
			s.startArrow = null;
		},
		toggleArrow(s, p: PayloadAction<TField>) {
			if (!s.startArrow || p.payload === s.startArrow) return;
			const index = s.arrows.findIndex((el) => el[0] === s.startArrow && el[1] === p.payload);
			if (index === -1) {
				s.arrows.push([s.startArrow, p.payload]);
				s.startArrow = null;

				return;
			}
			s.arrows = s.arrows.filter((_, j) => j !== index);
			s.startArrow = null;
		},
		clearArrow(s) {
			s.arrows = [];
		},
	},
});

export const arrowsReducer = slice.reducer;

export const { clearArrow, clearStartArrow, setStartArrow, toggleArrow } = slice.actions;
