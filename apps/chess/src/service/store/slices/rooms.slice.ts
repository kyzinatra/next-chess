import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
	roomId: string | null;
	players: number | null;
	isLoading: boolean;
}

const initialState: IInitialState = {
	roomId: null,
	players: null,
	isLoading: false,
};

const slice = createSlice({
	name: "rooms",
	initialState: initialState,
	reducers: {
		setRoomId(s, p: PayloadAction<string | null>) {
			s.roomId = p.payload;
		},
		clearRoom(s) {
			s.roomId = null;
			s.players = null;
		},
		setPlayers(s, p: PayloadAction<number>) {
			s.players = p.payload;
		},
		startLoading(s) {
			s.isLoading = true;
		},
		endLoading(s) {
			s.isLoading = false;
		},
	},
});

export const roomsReducer = slice.reducer;

export const { setRoomId, clearRoom, endLoading, startLoading, setPlayers } = slice.actions;
