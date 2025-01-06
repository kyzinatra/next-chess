import { RoomAvailable } from "colyseus.js";

export function searchRooms(rooms: RoomAvailable[] | undefined, search: string) {
	return rooms?.filter((el) => {
		return new RegExp(`.*${search}.*`, "gi").test(el.roomId);
	});
}
