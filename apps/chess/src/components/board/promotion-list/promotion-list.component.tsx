import { TField } from "@repo/constants/types";
import Image from "next/image";
import { FC, memo } from "react";
import { useDispatch } from "react-redux";

import css from "./promotion-list.module.css";
import { PROMOTION_LIST } from "./promotion-list.utils";

import { Chessboard } from "@/libs/chess/chess.lib";
import { clearPromotion } from "@/service/store/slices/promotion.slice";
import { useField } from "@/utils/hooks/use-field.hook";
import { useMove } from "@/utils/hooks/use-move.hook";

interface IPromotionListProps {
	to: TField;
	from: TField;
}

const PromotionListComponent: FC<IPromotionListProps> = ({ to, from }) => {
	const piece = useField(from);
	const [move] = useMove();
	const dispatch = useDispatch();

	function onClick(type: (typeof PROMOTION_LIST)[number]["type"]) {
		move(from, to, type);
		dispatch(clearPromotion());
	}

	function onClose() {
		dispatch(clearPromotion());
	}

	if (piece === null) return;

	return (
		<div className={css.promotion}>
			{PROMOTION_LIST.map((el) => (
				<button key={el.type} onClick={() => onClick(el.type)} className={css.piece}>
					<Image
						src={`/chess/${piece.color}${el.type}.png`}
						alt={Chessboard.getAlt(piece)}
						placeholder="empty"
						sizes="(max-width: 500px) 100px, (max-width: 768px) 200px, (max-width: 1200px) 400px"
						fill
					/>
				</button>
			))}
			<button className={css.close} onClick={onClose}>
				<Image src={`/close.svg`} alt="закрыть" placeholder="empty" width={30} height={30} />
			</button>
		</div>
	);
};

export const PromotionList = memo(PromotionListComponent);
