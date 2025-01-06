"use client";
import { useState } from "react";

import css from "./controls.module.css";

import { Button } from "@/components/ui/button/button.component";
import { Copy } from "@/components/ui/copy/copy.component";
import { Input } from "@/components/ui/input/input.component";
import { createRoom, joinRoom, disconnectRoom } from "@/service/store/middlewares/room.middleware";
import { useAppDispatch, useAppSelector } from "@/service/store/store";

export const Controls = () => {
	const dispatch = useAppDispatch();
	const roomId = useAppSelector((s) => s.rooms.roomId);
	const [state, setState] = useState<string>("");
	const isConnected = useAppSelector((s) => !!s.rooms.roomId);

	function onClick() {
		dispatch(createRoom());
	}
	function onClickConnect() {
		dispatch(joinRoom(state));
	}
	function onClickDisconnect() {
		dispatch(disconnectRoom());
	}

	return (
		<div className={css.controls}>
			<Copy className={css.copy}>{roomId || ""}</Copy>
			<Button onClick={onClick}>Создать</Button>
			<div className={css.connect}>
				{!isConnected && <Button onClick={onClickConnect}>Подключится</Button>}
				{isConnected && <Button onClick={onClickDisconnect}>Отключится</Button>}
				<Input
					type="text"
					value={state}
					placeholder="ID комнаты"
					onChange={(e) => setState(e.target.value)}
				/>
			</div>
		</div>
	);
};
