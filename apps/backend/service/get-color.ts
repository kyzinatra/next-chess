import { getRandomColor } from "../utils/get-random-color";

export function getColor(prefer: "w" | "b" | "r", lastClient: "w" | "b" | null) {
	if (!lastClient) {
		if (prefer === "r") return getRandomColor();
		return prefer;
	}

	return lastClient === "b" ? "w" : "b";
}
