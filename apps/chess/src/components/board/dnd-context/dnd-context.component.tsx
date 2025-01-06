import {
	DndContext as LibDndContext,
	DragOverlay,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import React, { FC, PropsWithChildren } from "react";

import { Piece } from "../piece/piece.component";

import { useDnd } from "./use-dnd.hook";

import { useAppSelector } from "@/service/store/store";
import { restrictToNodeEdges } from "@/utils/modifiers/restrict-to-node";


interface IDnDProps {
	node: React.RefObject<HTMLDivElement | null>;
}

export const DndContext: FC<PropsWithChildren<IDnDProps>> = ({ children, node }) => {
	const { onMoveEnd, onMoveStart } = useDnd();
	const isActive = useAppSelector((s) => s.board.active);

	const mouseSensor = useSensor(MouseSensor);
	const touchSensor = useSensor(TouchSensor);
	const keyboardSensor = useSensor(KeyboardSensor);

	const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

	return (
		<LibDndContext
			modifiers={[snapCenterToCursor, restrictToNodeEdges(node)]}
			onDragEnd={onMoveEnd}
			sensors={sensors}
			onDragStart={onMoveStart}
			id="chess"
		>
			{children}
			<DragOverlay dropAnimation={null}>{isActive && <Piece label={isActive} />}</DragOverlay>
		</LibDndContext>
	);
};
