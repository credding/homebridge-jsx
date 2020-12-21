import { ContextKey, runtimeContext } from "../runtime";
import { Context } from "../types";

export const useContext = <TValue>(context: Context<TValue>): TValue => {
  const { contextMap } = runtimeContext.getStore()!;
  return contextMap[(context as ContextKey<TValue>).symbol as any] as TValue;
};
