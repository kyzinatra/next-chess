import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";

export type TCustomMiddleware<T = undefined> = (
	props: T
) => (api: MiddlewareAPI<Dispatch>) => (next: Dispatch) => <A extends Action>(action: A) => unknown;
