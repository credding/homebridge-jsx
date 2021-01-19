import { getRuntimeContext } from "../runtimeContext";
import { ContextWithKey } from "../runtimeTypes";
import { Context } from "../types";

export const useContext = <TValue>(context: Context<TValue>): TValue => {
  const { symbol } = context as ContextWithKey<TValue>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/microsoft/TypeScript/issues/1863
  const { [symbol as any]: value } = getRuntimeContext();
  return value as TValue;
};
