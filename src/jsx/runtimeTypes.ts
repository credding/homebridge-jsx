import { Context, EffectCallback } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ContextMap = Record<any, unknown>;

export type ContextKey<TValue> = Context<TValue> & {
  readonly symbol: symbol;
};

export type RuntimeContext = {
  contextMap: ContextMap;
  effects: EffectCallback[];
};
