import { useDroppable } from "@dnd-kit/core";
import { TField } from "@repo/constants/types";
import clsx from "classnames";
import { FC, memo } from "react";

import { Overlay } from "../overlay/overlay.component";
import { DraggablePiece } from "../piece/draggable-piece/draggable-piece.component";
import { PromotionList } from "../promotion-list/promotion-list.component";

import css from "./square.module.css";
import { useSquareControl } from "./use-square-control.hook";

import { Chessboard } from "@/libs/chess/chess.lib";
import { useAppSelector } from "@/service/store/store";
interface SquareProps {
	label: TField;
	showLetter?: boolean;
	showNumber?: boolean;
}

const SquareComponent: FC<SquareProps> = ({ label, showNumber, showLetter }) => {
	const content = {
		"--square-content-letter": showLetter ? '"' + label[0] + '"' : "",
		"--square-content-number": showNumber ? '"' + label[1] + '"' : "",
	} as React.CSSProperties;

	const { setNodeRef: droppableRef, isOver } = useDroppable({
		id: label,
	});
	const { onMouseUp, onMouseDown } = useSquareControl(label);

	const promotion = useAppSelector(
		(s) => s.promotion.promotion,
		(p, n) => p === n || !!(n && !n.includes(label)) //? Рендерим поле только если это имеет смысл
	);
	const isActive = useAppSelector((s) => s.board.active === label);
	return (
		<>
			<div
				style={content}
				ref={droppableRef}
				onMouseUp={onMouseUp}
				onMouseDown={onMouseDown}
				onContextMenu={(e) => e.preventDefault()}
				className={clsx(css.square, {
					[css.white]: Chessboard.getColorByLabel(label) === "w",
					[css.over]: isOver,
				})}
			>
				<Overlay label={label} />
				{!isActive && <DraggablePiece label={label} />}
				{promotion && promotion[1] === label && <PromotionList from={promotion[0]} to={promotion[1]} />}
			</div>
		</>
	);
};

export const Square = memo(SquareComponent);
