import { TField } from "@repo/constants/types";
import { MouseEvent, useCallback } from "react";

import { clearArrow, setStartArrow, toggleArrow } from "@/service/store/slices/arrows.slice";
import { clearHighlight, toggleHighlight } from "@/service/store/slices/highlight.slice";
import { clearPreMove } from "@/service/store/slices/last-move.slice";
import { clearMoves } from "@/service/store/slices/moves.slice";
import { useAppDispatch, useAppSelector } from "@/service/store/store";
import { useMove } from "@/utils/hooks/use-move.hook";

export function useSquareControl(label: TField) {
	const dispatch = useAppDispatch();
	const startArrow = useAppSelector((s) => s.arrows.startArrow);
	const preMove = useAppSelector((s) => s.lastMove.preMove);
	const [move] = useMove();

	const onMouseUp = useCallback(
		(e: MouseEvent) => {
			if (e.button === 2) {
				if (startArrow && startArrow !== label) {
					dispatch(toggleArrow(label));
					return;
				}
				dispatch(toggleHighlight(label));
				return;
			}
			if (e.button === 0) {
				if (preMove) move(preMove, label);

				//? при клике очищаем все выделения. Если была затронута другая фигура, то они поставятся снова
				dispatch(clearHighlight());
				dispatch(clearArrow());
				dispatch(clearPreMove());
				dispatch(clearMoves());
			}
		},
		[dispatch, label, move, preMove, startArrow]
	);

	const onMouseDown = useCallback(
		(e: MouseEvent) => {
			if (e.button === 2) {
				dispatch(setStartArrow(label));
			}
		},
		[dispatch, label]
	);

	return { onMouseUp, onMouseDown };
}
