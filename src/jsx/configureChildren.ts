import { ContextMap } from "./runtimeTypes";
import { Children, Component, Configuration } from "./types";

export const configureChildren = <TState, TReturn>(
  children: Children<Component<Configuration<TState, TReturn>>>,
  contextMap: ContextMap,
  state: TState
): TReturn[] => {
  if (typeof children === "undefined") {
    return [];
  }

  if (Array.isArray(children)) {
    return children
      .map((child) =>
        child.getConfiguration(contextMap).applyConfiguration(state)
      )
      .flat();
  }

  return children.getConfiguration(contextMap).applyConfiguration(state);
};
