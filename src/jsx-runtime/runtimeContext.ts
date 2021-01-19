import { RuntimeContext } from "./runtimeTypes";
import { OpaqueContext } from "./types";

let currentRuntimeContext: RuntimeContext | null = null;

export const withRuntimeContext = <TReturn>(
  context: RuntimeContext,
  callback: (context: OpaqueContext) => TReturn
): TReturn => {
  const prevContext = currentRuntimeContext;
  currentRuntimeContext = context;
  const result = callback(context);
  currentRuntimeContext = prevContext;
  return result;
};

export const getRuntimeContext = (): RuntimeContext => {
  if (!currentRuntimeContext) {
    throw new Error("hooks cannot be used inside an effect");
  }
  return currentRuntimeContext;
};
