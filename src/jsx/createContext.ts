import { configureChildren } from "./configureChildren";
import { ContextKey } from "./runtimeTypes";
import { Component, Configuration, Context, ContextProvider } from "./types";

export const createContext = <TValue = unknown>(): Context<TValue> => {
  const symbol = Symbol();

  const Provider: ContextProvider<TValue> = ({ value, children }) => {
    return new Component((prevContextMap) => {
      const contextMap = { ...prevContextMap, [symbol]: value };
      return new Configuration((state) => {
        return configureChildren(children, contextMap, state);
      });
    });
  };

  return { symbol, Provider } as ContextKey<TValue>;
};
