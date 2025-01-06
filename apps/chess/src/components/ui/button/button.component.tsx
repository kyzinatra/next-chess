import clsx from "classnames";
import { FC } from "react";

import css from "./button.module.css";

type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<TButtonProps> = ({ className, ...props }) => {
	return <button className={clsx(className, css.button)} {...props} />;
};
