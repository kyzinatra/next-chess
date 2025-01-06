import { FC, PropsWithChildren } from "react";

import css from "./move-item.module.css";

export const MoveItem: FC<PropsWithChildren> = ({ children }) => {
	return <li className={css.item}>{children}</li>;
};
