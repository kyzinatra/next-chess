import { FC, PropsWithChildren } from "react";

import css from "./list-item.module.css";

export const ListItem: FC<PropsWithChildren> = ({ children }) => {
	return <li className={css.list_item}>{children}</li>;
};
