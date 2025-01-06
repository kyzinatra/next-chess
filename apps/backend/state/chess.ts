import { ArraySchema, MapSchema, Schema, type } from "@colyseus/schema";
import { Player } from "./player";
import { TField } from "@repo/constants/types";

export class ChessState extends Schema {
	@type({ map: Player }) players = new MapSchema<Player>();
	@type(["string"]) lastMove = new ArraySchema<TField>();
}
