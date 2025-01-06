import { ROWS } from "../constants/chess";

export type TField = `${(typeof ROWS)[number]}${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`;
export type TMakeMove = {
	from: TField;
	to: TField;
	promotion?: "q" | "n" | "r" | "b";
};

export type Color = "w" | "b";
