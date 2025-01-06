import { useEffect, useRef, useState } from "react";

import css from "./arrows.module.css";

import { useAppSelector } from "@/service/store/store";
import { getArrowPath } from "@/utils/chess/get-arrow-path";

export const Arrows = () => {
	const arrows = useAppSelector((s) => s.arrows.arrows);
	const [squareSize, setSquareSize] = useState<null | number>(null);
	const ref = useRef<SVGSVGElement>(null);
	const orientation = useAppSelector((s) => s.board.orientation);

	useEffect(() => {
		if (!ref.current) return;
		function resize() {
			const box = ref.current?.getClientRects()[0].width;
			if (!box) return;
			setSquareSize(box / 8 || null);
		}
		resize();
		window.addEventListener("resize", resize);
		return () => window.removeEventListener("resize", resize);
	}, []);

	return (
		<svg className={css.arrows} ref={ref}>
			{arrows.map(([from, to]) => {
				const { path, rotate, origin, scale } = getArrowPath([from, to], squareSize, orientation);
				return (
					<polygon
						style={{
							fill: "rgba(255, 170, 0, 0.9)",
							opacity: 0.8,
							transform: `rotate(${rotate}deg) ${scale || ""}`,
							transformOrigin: origin,
						}}
						key={from + to}
						points={path.map((el) => el.join(" ")).join(", ")}
					/>
				);
			})}
		</svg>
	);
};
