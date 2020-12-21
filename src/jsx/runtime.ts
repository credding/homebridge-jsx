import { AsyncLocalStorage } from "async_hooks";
import {
  CleanupCallback,
  Component,
  ComponentFn,
  Configuration,
  Context,
  EffectCallback,
} from "./types";

export type ContextMap = Record<any, any>;

export type ContextKey<TValue> = Context<TValue> & {
  readonly symbol: symbol;
};

type RuntimeContext = {
  contextMap: ContextMap;
  effects: EffectCallback[];
};

export const runtimeContext = new AsyncLocalStorage<RuntimeContext>();

export const createConfiguration = <TProps, TConfiguration>(
  componentFn: ComponentFn<TProps, TConfiguration>,
  props: TProps
): Component<TConfiguration> => async (contextMap) => {
  const { effects } = runtimeContext.getStore()!;

  const context = { contextMap, effects };

  return await runtimeContext.run(context, async () => {
    const component = await componentFn(props);
    return await component(contextMap);
  });
};

export const executeConfiguration = async <TState, TReturn>(
  root: Component<Configuration<TState, TReturn>>,
  state: TState
): Promise<[TReturn[], CleanupCallback]> => {
  const contextMap: ContextMap = {};
  const effects: EffectCallback[] = [];

  const context = { contextMap, effects };

  const result = await runtimeContext.run(context, async () => {
    const configuration = await root(contextMap);
    return await configuration(state);
  });

  const cleanup: CleanupCallback[] = [];

  for (const effectCb of effects) {
    const cleanupCb = effectCb();
    if (typeof cleanupCb === "function") {
      cleanup.push(cleanupCb);
    }
  }

  const cleanupCallback = () => {
    for (const cleanupCb of cleanup) {
      cleanupCb();
    }
  };

  return [result, cleanupCallback];
};
