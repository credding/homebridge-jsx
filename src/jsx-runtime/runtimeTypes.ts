import { Context, EffectCallback } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/microsoft/TypeScript/issues/1863
export type RuntimeContext = Record<any, unknown> & {
  readonly effects: EffectCallback[];
};

export type ContextWithKey<TValue> = Context<TValue> & {
  readonly symbol: symbol;
};
