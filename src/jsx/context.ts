import { configureChildren } from "./children";
import { ContextKey } from "./runtime";
import { Context, ContextProvider } from "./types";

export const createContext = <TValue = any>(): Context<TValue> => {
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
