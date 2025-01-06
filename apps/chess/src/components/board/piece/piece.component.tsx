import { Square } from "chess.js";
import Image from "next/image";
import { FC, memo, Ref } from "react";

import css from "./piece.module.css";


import { Chessboard } from "@/libs/chess/chess.lib";
import { useField } from "@/utils/hooks/use-field.hook";

interface IPieceProps {
	label: Square;
	isDraggable?: boolean;
	ref?: Ref<HTMLImageElement>;
	style?: React.CSSProperties;
}

const PieceComponent: FC<IPieceProps> = ({ label, ref, ...props }) => {
	const piece = useField(label);

	if (!piece) return null;
	return (
		<Image
			ref={ref}
			{...props}
			className={css.piece}
			src={`/chess/${piece.color}${piece.type}.png`}
			alt={Chessboard.getAlt(piece)}
			placeholder="empty"
			sizes="(max-width: 500px) 100px, (max-width: 768px) 200px, (max-width: 1200px) 400px"
			fill
		/>
	);
};

export const Piece = memo(PieceComponent);
