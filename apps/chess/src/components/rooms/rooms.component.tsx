"use client";
import { Controls } from "./controls/controls.component";
import { List } from "./list/list.component";
import css from "./rooms.module.css";

export const Rooms = () => {
	return (
		<div className={css.rooms}>
			<Controls />
			<List />
		</div>
	);
};
