import { getChildConfigurations } from "./getChildConfigurations";
import { ContextWithKey, RuntimeContext } from "./runtimeTypes";
import { Context, ContextProvider } from "./types";

export const createContext = <TValue = unknown>(): Context<TValue> => {
  const symbol = Symbol();
  const Provider = createContextProvider(symbol);

  return { symbol, Provider } as ContextWithKey<TValue>;
};

const createContextProvider = <TValue>(
  symbol: symbol
): ContextProvider<TValue> => ({ value, children }) => ({
  getConfiguration: (prevContext) => {
    const context = { ...(prevContext as RuntimeContext), [symbol]: value };
    return getChildConfigurations(children, context);
  },
});
