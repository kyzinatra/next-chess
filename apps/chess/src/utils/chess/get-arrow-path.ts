import { COLUMNS_REVERSED, ROWS } from "@repo/constants";
import { TField } from "@repo/constants/types";
import { Color } from "chess.js";

import { getKnightTransform, isKnightMove } from "./get-knight-transform";

export function getArrowPath([from, to]: TField[], squareSize: number | null, orientation: Color) {
	if (!squareSize) return { path: [], rotate: 0 };

	const letters = [...ROWS];
	const numbers = [...COLUMNS_REVERSED];

	if (orientation === "b") {
		letters.reverse();
		numbers.reverse();
	}

	const lineWeight = squareSize / 10;

	const fromX = letters.findIndex((el) => el === from[0]);
	const fromY = numbers.findIndex((el) => el === +from[1]);

	const toX = letters.findIndex((el) => el === to[0]);
	const toY = numbers.findIndex((el) => el === +to[1]);

	const YNorm = toY - fromY;
	const XNorm = toX - fromX;

	const shiftX = fromX * squareSize + squareSize / 2;
	const shiftY = fromY * squareSize + squareSize / 2;

	if (isKnightMove(XNorm, YNorm)) {
		const [angle, isScale] = getKnightTransform(XNorm, YNorm);
		return {
			rotate: (angle * 180) / Math.PI,
			scale: isScale ? "scale(1, -1)" : "",
			origin: `${shiftX}px ${shiftY}px`,
			path: [
				[shiftX - lineWeight, shiftY - lineWeight * 3],
				[shiftX + lineWeight, shiftY - lineWeight * 3],
				[shiftX + lineWeight, shiftY - squareSize * 2 + lineWeight],
				[shiftX + squareSize - lineWeight * 3, shiftY - squareSize * 2 + lineWeight],
				[shiftX + squareSize - lineWeight * 3, shiftY - squareSize * 2 + lineWeight * 2],
				[shiftX + squareSize, shiftY - squareSize * 2],
				[shiftX + squareSize - lineWeight * 3, shiftY - squareSize * 2 - lineWeight * 2],
				[shiftX + squareSize - lineWeight * 3, shiftY - squareSize * 2 - lineWeight * 1],
				[shiftX - lineWeight, shiftY - lineWeight * 1 - squareSize * 2],
				[shiftX - lineWeight, shiftY - lineWeight * 3],
			],
		};
	}

	const dist = Math.sqrt(XNorm ** 2 + YNorm ** 2) * squareSize;
	let angle = -Math.PI / 2 + Math.atan(YNorm / XNorm);

	if (XNorm >= 0) angle += Math.PI;

	return {
		rotate: (angle * 180) / Math.PI,
		origin: `${shiftX}px ${shiftY}px`,
		path: [
			[shiftX - lineWeight, shiftY - lineWeight * 3],
			[shiftX + lineWeight, shiftY - lineWeight * 3],
			[shiftX + lineWeight, shiftY - (dist - lineWeight * 3)],
			[shiftX + lineWeight * 2, shiftY - (dist - lineWeight * 3)],
			[shiftX, shiftY - dist],
			[shiftX - lineWeight * 2, shiftY - (dist - lineWeight * 3)],
			[shiftX - lineWeight, shiftY - (dist - lineWeight * 3)],
			[shiftX - lineWeight, shiftY - lineWeight * 3],
		],
	};
}
