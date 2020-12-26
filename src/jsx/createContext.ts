import { configureChildren } from "./configureChildren";
import { ContextKey } from "./runtimeTypes";
import { Context, ContextProvider } from "./types";

export const createContext = <TValue = unknown>(): Context<TValue> => {
  const symbol = Symbol();

  const Provider: ContextProvider<TValue> = ({ value, children }) => {
    return (prevContext) => {
      const context = { ...prevContext, [symbol]: value };
      return (state) => {
        return configureChildren(children, context, state);
      };
    };
  };

  return { symbol, Provider } as ContextKey<TValue>;
};
