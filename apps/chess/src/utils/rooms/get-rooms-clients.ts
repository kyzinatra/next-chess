import { Client } from "colyseus.js";

import { CLIENT_URL } from "@/constants/rooms";

let client: Client | null = null;
export function getRoomClient() {
	if (client === null) {
		client = new Client(CLIENT_URL);
	}

	return client;
}
