import { Color } from "../types/chess";

export const ROWS = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
export const COLUMNS = [1, 2, 3, 4, 5, 6, 7, 8];
export const COLUMNS_REVERSED = COLUMNS.reverse();

// colors
export const WHITE = "w";
export const BLACK = "b";

export const DEFAULT_ORIENTATION: Color = "w";
