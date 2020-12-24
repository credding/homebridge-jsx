import { getRuntimeContext } from "../runtime";
import { ContextKey } from "../runtimeTypes";
import { Context } from "../types";

export const useContext = <TValue>(context: Context<TValue>): TValue => {
  const { contextMap } = getRuntimeContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  return contextMap[(context as ContextKey<TValue>).symbol as any] as TValue;
};
