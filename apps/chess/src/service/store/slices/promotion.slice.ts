import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TField } from "@repo/constants/types";

//? Данны прохода пешки в ферзи
interface IInitialState {
	promotion: [TField, TField] | null;
}

const initialState: IInitialState = {
	promotion: null,
};

const slice = createSlice({
	name: "promotion",
	initialState: initialState,
	reducers: {
		clearPromotion(s) {
			s.promotion = null;
		},
		setPromotion: (s, { payload }: PayloadAction<[TField, TField]>) => {
			s.promotion = payload;
		},
	},
});

export const promotionReducer = slice.reducer;
export const { clearPromotion, setPromotion } = slice.actions;
