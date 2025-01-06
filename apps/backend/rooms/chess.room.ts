import { Client, Room } from "colyseus";
import http from "http";

import { Chess } from "chess.js";
import { ChessState } from "../state/chess";
import { IChessRoomOptions } from "../types/room.types";
import { Player } from "../state/player";
import { getColor } from "../service/get-color";
import { ROOM_ACTIONS } from "@repo/constants";
import { TMakeMove } from "@repo/constants/types";

export class ChessRoom extends Room<ChessState> {
	chess: Chess;
	static async onAuth(token: string, request: http.IncomingMessage) {
		return true;
	}

	sendBoard() {
		this.broadcast(ROOM_ACTIONS.board, this.chess.fen());
		this.broadcast(ROOM_ACTIONS.turn, this.chess.turn());
		this.broadcast(ROOM_ACTIONS.history, this.chess.history());
		if (this.state.lastMove.length) this.broadcast(ROOM_ACTIONS.lastMove, this.state.lastMove);
	}

	makeMove(client: Client, message: TMakeMove) {
		const player = this.state.players.get(client.id);
		const fromPiece = this.chess.get(message.from);

		if (fromPiece.color !== player?.color) {
			return this.sendBoard();
		}
		try {
			const move = this.chess.move({ from: message.from, to: message.to, promotion: message.promotion });

			this.state.lastMove.setAt(0, move.from);
			this.state.lastMove.setAt(1, move.to);
			this.sendBoard();
		} catch {
			this.sendBoard();
		}
	}

	onCreate(options: IChessRoomOptions) {
		console.log("onCreate", options);

		this.setState(new ChessState());
		this.maxClients = 2;

		if (options.private) {
			this.setPrivate(true);
		}
		this.chess = new Chess();
		this.onMessage(ROOM_ACTIONS.move, this.makeMove.bind(this));
	}

	// When client successfully join the room
	onJoin(client: Client, options: IChessRoomOptions, isAuth?: boolean) {
		if (!isAuth) {
			client.error(403, "Forbidden");
			client.leave(4001);
			return;
		}
		const player = new Player();

		const clientLength = this.clients.length;
		let lastClientColor: null | "w" | "b" = null;

		if (clientLength === 2 && this.clients?.[0]?.id) {
			lastClientColor = this.state.players.get(this.clients[0].id)?.color || null;
		}

		player.color = getColor(options.color, lastClientColor);
		this.state.players.set(client.id, player);

		this.sendBoard();
		client.send(ROOM_ACTIONS.orientation, player.color);
		console.log("onJoin", this.roomId, client.id, player.color);
	}

	// When a client leaves the room
	async onLeave(client: Client, consented: boolean) {
		console.log("onLeave");
		try {
			await this.allowReconnection(client, 10);
		} catch {
			this.state.players.delete(client.sessionId);
		}
	}

	// Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
	onDispose() {
		console.log("onDispose");
	}
}
