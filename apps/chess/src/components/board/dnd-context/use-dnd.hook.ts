import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { TField } from "@repo/constants/types";
import { useCallback } from "react";

import { setActive } from "@/service/store/slices/board.slice";
import { useAppDispatch } from "@/service/store/store";
import { useMove } from "@/utils/hooks/use-move.hook";

export function useDnd() {
	const [move, getMoves] = useMove();
	const dispatch = useAppDispatch();

	const onMoveEnd = useCallback(
		(e: DragEndEvent) => {
			const to = String(e.over?.id) as TField;
			const from = String(e.active.id) as TField;
			dispatch(setActive(null));
			move(from, to);
		},
		[dispatch, move]
	);

	const onMoveStart = useCallback(
		(e: DragStartEvent) => {
			const square = String(e.active.id) as TField;
			if (!square) return;
			dispatch(setActive(square));
			getMoves(square);
		},
		[dispatch, getMoves]
	);

	return { onMoveEnd, onMoveStart };
}
