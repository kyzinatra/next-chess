import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/style.css";

import { Provider } from "@/components/provider/provider.component";

const inter = Inter({ weight: ["100", "400", "600", "800"], subsets: ["cyrillic", "latin"] });

export const metadata: Metadata = {
	title: "chess",
	description: "chess",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<head></head>
			<body className={inter.className}>
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
