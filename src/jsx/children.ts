import { ContextMap } from "./runtime";
import { Children, Component, Configuration } from "./types";

export const configureChildren = async <TState, TReturn>(
  children: Children<Component<Configuration<TState, TReturn>>>,
  contextMap: ContextMap,
  state: TState
): Promise<TReturn[]> => {
  if (typeof children === "undefined") {
    return [];
  }

  if (Array.isArray(children)) {
    const results = await Promise.all(
      children!.map((child) => configureChild(child, contextMap, state))
    );
    return results.flat();
  }

  return await configureChild(children, contextMap, state);
};

const configureChild = async <TState, TReturn>(
  child: Component<Configuration<TState, TReturn>>,
  contextMap: ContextMap,
  state: TState
): Promise<TReturn[]> => {
  const configuration = await child(contextMap);
  return await configuration(state);
};
