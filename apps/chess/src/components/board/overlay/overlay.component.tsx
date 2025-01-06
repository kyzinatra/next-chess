
import { Square } from "chess.js";
import clsx from "classnames";
import { FC, memo } from "react";

import css from "./overlay.module.css";

import { useAppSelector } from "@/service/store/store";
import { useField } from "@/utils/hooks/use-field.hook";

interface IMoveOverlayProps {
	label: Square;
}

const OverlayComponent: FC<IMoveOverlayProps> = ({ label }) => {
	const field = useField(label);

	const isYellow = useAppSelector(
		(s) => s.lastMove.lastMove.some((el) => el === label) || s.lastMove.preMove === label
	);
	const isHighlighted = useAppSelector((s) => s.highlight.highlighted.some((el) => el === label));
	const isMove = useAppSelector((s) => !!s.moves.moves?.some((el) => el.includes(label)));

	return (
		<>
			{(isHighlighted || isYellow) && (
				<div className={clsx({ [css.highlighted_yellow]: isYellow, [css.highlighted_red]: isHighlighted })} />
			)}
			{isMove && <div className={field ? css.attack_overlay : css.overlay} />}
		</>
	);
};

export const Overlay = memo(OverlayComponent);
