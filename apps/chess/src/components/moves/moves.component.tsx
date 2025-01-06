"use client";
import { MoveItem } from "./move-item/move-tem.component";
import css from "./moves.module.css";

import { useAppSelector } from "@/service/store/store";

export const Moves = () => {
	const history = useAppSelector((s) => s.board.history);
	return (
		<>
			<ul className={css.moves}>{history?.map((el, i) => <MoveItem key={i}>{el}</MoveItem>)}</ul>
		</>
	);
};
