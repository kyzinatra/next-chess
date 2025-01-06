import { ROWS } from "@repo/constants";
import { TField } from "@repo/constants/types";
import { Color } from "chess.js";

export function getChessField(orientation: Color): TField[][] {
	if (orientation === "w") {
		return Array.from({ length: 8 }, (_, i) =>
			Array.from({ length: 8 }, (_, j) => ((ROWS.at(j) ?? "") + (8 - i)) as TField)
		);
	}

	return Array.from({ length: 8 }, (_, i) =>
		Array.from({ length: 8 }, (_, j) => ((ROWS.at(-j - 1) ?? "") + (i + 1)) as TField)
	);
}
