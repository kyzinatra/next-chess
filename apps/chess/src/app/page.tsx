import { Board } from "@components/board/board.component";
import { Moves } from "@components/moves/moves.component";
import { Rooms } from "@components/rooms/rooms.component";
import { Suspense } from "react";

import css from "../styles/page.module.css";

export default async function Home() {
	return (
		<Suspense>
			<main className={css.main}>
				<Rooms />
				<Board />
				<Moves />
			</main>
		</Suspense>
	);
}
