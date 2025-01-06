import { Schema, type } from "@colyseus/schema";

export class Player extends Schema {
	@type("string") color: "b" | "w";
}
