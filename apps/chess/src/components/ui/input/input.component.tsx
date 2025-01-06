import clsx from "classnames";
import { FC } from "react";

import css from "./input.module.css";

type TInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<TInputProps> = ({ className, ...props }) => {
	return <input className={clsx(className, css.input)} {...props} />;
};
