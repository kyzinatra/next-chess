import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
	roomId: string | null;
}

const initialState: IInitialState = {
	roomId: null,
};

const slice = createSlice({
	name: "rooms",
	initialState: initialState,
	reducers: {
		setRoomId(s, p: PayloadAction<string | null>) {
			s.roomId = p.payload;
		},
	},
});

export const roomsReducer = slice.reducer;

export const { setRoomId } = slice.actions;
