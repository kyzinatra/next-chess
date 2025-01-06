import { useDraggable } from "@dnd-kit/core";
import { TField } from "@repo/constants/types";
import React, { FC, memo } from "react";

import { Piece } from "../piece.component";

import { useAppSelector } from "@/service/store/store";
import { useField } from "@/utils/hooks/use-field.hook";

const DraggablePieceComponent: FC<{ label: TField }> = ({ label }) => {
	const turn = useAppSelector((s) => (s.rooms.roomId ? s.board.orientation : s.board.turn));
	const piece = useField(label);

	const { setNodeRef, listeners, attributes, transform } = useDraggable({
		id: label,
		disabled: turn !== piece?.color,
	});

	const style = transform && {
		transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		zIndex: 2,
	};

	return <Piece label={label} ref={setNodeRef} {...listeners} {...attributes} style={style || undefined} />;
};

export const DraggablePiece = memo(DraggablePieceComponent);
