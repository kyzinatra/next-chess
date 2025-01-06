"use client";
import { FC, PropsWithChildren } from "react";

import { ReduxProvider } from "./redux-provider/redux-provider.component";

export const Provider: FC<PropsWithChildren> = ({ children }) => {
	return <ReduxProvider>{children}</ReduxProvider>;
};
