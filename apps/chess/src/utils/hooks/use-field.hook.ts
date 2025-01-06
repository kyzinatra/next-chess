import { ROWS } from "@repo/constants";
import { TField } from "@repo/constants/types";
import { shallowEqual } from "react-redux";

import { useAppSelector } from "@/service/store/store";

export function useField(label: TField) {
	return useAppSelector((s) => {
		const i = 8 - +label[1];
		const j = ROWS.findIndex((el) => el === label[0]);
		return s.board.board[i]?.[j] || null;
	}, shallowEqual);
}
