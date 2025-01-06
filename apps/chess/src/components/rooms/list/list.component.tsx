"use client";
import { RoomAvailable } from "colyseus.js";
import { useEffect, useState } from "react";

import { ListItem } from "./list-item/list-item.component";
import css from "./list.module.css";

import { Button } from "@/components/ui/button/button.component";
import { Copy } from "@/components/ui/copy/copy.component";
import { Input } from "@/components/ui/input/input.component";
import { ROOM_NAME } from "@/constants/rooms";
import { joinRoom } from "@/service/store/middlewares/room.middleware";
import { useAppDispatch } from "@/service/store/store";
import { getRoomClient } from "@/utils/rooms/get-rooms-clients";
import { searchRooms } from "@/utils/rooms/search";

export const List = () => {
	const [availableRooms, setAvailableRooms] = useState<RoomAvailable[]>();
	const [search, setSearch] = useState("");
	const dispatch = useAppDispatch();

	async function updateRooms() {
		const client = getRoomClient();
		setAvailableRooms(await client.getAvailableRooms(ROOM_NAME));
	}

	useEffect(() => {
		updateRooms();
	}, []);

	function connect(id: string) {
		dispatch(joinRoom(id));
	}

	return (
		<>
			<h2 className={css.title}>Список комнат:</h2>
			<div className={css.controls}>
				<Button onClick={updateRooms}>Обновить</Button>
				{!!availableRooms?.length && (
					<Input
						type="search"
						placeholder="Поиск"
						value={search}
						className={css.search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				)}
			</div>
			<ul className={css.list}>
				{searchRooms(availableRooms, search)
					?.slice(0, 10)
					.map((el) => (
						<ListItem key={el.roomId}>
							<Copy className={css.list__title}>{el.roomId}</Copy>
							<Button onClick={() => connect(el.roomId)} className={css.button}>
								Присоединится
							</Button>
						</ListItem>
					))}
			</ul>
		</>
	);
};
