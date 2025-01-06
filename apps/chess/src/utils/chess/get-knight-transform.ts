export function getKnightTransform(x: number, y: number): [number, boolean] {
	//? Довольно сложно придумать формулу для вращения стрелки коня. Это простой и рабочий вариант

	if (x === 2 && y === 1) return [Math.PI / 2, false];
	if (x === 1 && y === 2) return [0, true];
	if (x === 1 && y === -2) return [0, false];
	if (x === 2 && y === -1) return [-Math.PI / 2, true];

	if (x === -2 && y === 1) return [Math.PI / 2, true];
	if (x === -1 && y === 2) return [Math.PI, false];
	if (x === -2 && y === -1) return [-Math.PI / 2, false];
	if (x === -1 && y === -2) return [Math.PI, true];

	return [0, false];
}

export function isKnightMove(x: number, y: number) {
	x = Math.abs(x);
	y = Math.abs(y);
	return (x === 2 && y === 1) || (x === 1 && y === 2);
}
