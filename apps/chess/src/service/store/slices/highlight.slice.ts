import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TField } from "@repo/constants/types";

//? Красная подсветка на ПКМ
interface IInitialState {
	highlighted: TField[];
}

const initialState: IInitialState = {
	highlighted: [],
};

const slice = createSlice({
	name: "highlight",
	initialState: initialState,
	reducers: {
		clearHighlight(s) {
			s.highlighted = [];
		},
		toggleHighlight(s, p: PayloadAction<TField>) {
			const index = s.highlighted.findIndex((el) => el === p.payload);
			if (index === -1) {
				s.highlighted.push(p.payload);
				return;
			}
			s.highlighted = s.highlighted.filter((_, j) => j !== index);
		},
	},
});

export const highlightReducer = slice.reducer;
export const { toggleHighlight, clearHighlight } = slice.actions;
