import clsx from "classnames";
import Image from "next/image";
import { FC } from "react";

import css from "./copy.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: string;
}

export const Copy: FC<Props> = ({ children, className, ...props }) => {
	async function onCopy() {
		if (navigator.clipboard) {
			await navigator.clipboard.writeText(children);
		} else {
			const tempInput = document.createElement("textarea");
			tempInput.value = children;
			document.body.appendChild(tempInput);
			tempInput.select();
			document.execCommand("copy");
			document.body.removeChild(tempInput);
		}
	}

	if (!children) return;
	return (
		<button {...props} className={clsx(className, css.copy)} onClick={onCopy}>
			{children}
			<Image alt="скопировать" src="/copy.svg" width={20} height={20} />
		</button>
	);
};
