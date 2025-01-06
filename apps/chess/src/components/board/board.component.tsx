"use client";
import React, { useRef } from "react";

import { Arrows } from "./arrows/arrows.component";
import css from "./board.module.css";
import { DndContext } from "./dnd-context/dnd-context.component";
import { Square } from "./square/square.component";


import { useAppSelector } from "@/service/store/store";


export const Board = () => {
	const rectRef = useRef<HTMLDivElement>(null);
	const board = useAppSelector((s) => s.board.squares);

	return (
		<div className={css.board_wrapper}>
			<div className={css.board} ref={rectRef}>
				<DndContext node={rectRef}>
					{board.map((row, i) => (
						<React.Fragment key={i}>
							{row.map((square, j) => (
								<Square
									key={square}
									showLetter={i === board.length - 1}
									showNumber={j === 0}
									label={square}
								/>
							))}
						</React.Fragment>
					))}
				</DndContext>
				<Arrows />
			</div>
		</div>
	);
};
