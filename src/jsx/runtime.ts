import { ContextMap, RuntimeContext } from "./runtimeTypes";
import {
  CleanupCallback,
  Component,
  ComponentFn,
  Configuration,
  EffectCallback,
} from "./types";

let runtimeContext: RuntimeContext | null = null;

export const getRuntimeContext = (): RuntimeContext => {
  if (!runtimeContext) {
    throw new Error("hooks cannot be used inside an effect");
  }
  return runtimeContext;
};

export const createConfiguration = <TProps, TConfiguration>(
  componentFn: ComponentFn<TProps, TConfiguration>,
  props: TProps
): Component<TConfiguration> =>
  new Component((contextMap) => {
    const { effects } = getRuntimeContext();
    runtimeContext = { contextMap, effects };

    return componentFn(props).getConfiguration(contextMap);
  });

export const applyConfiguration = <TState, TReturn>(
  root: Component<Configuration<TState, TReturn>>,
  state: TState
): [TReturn[], CleanupCallback] => {
  const contextMap: ContextMap = {};
  const effects: EffectCallback[] = [];

  runtimeContext = { contextMap, effects };
  const result = root.getConfiguration(contextMap).applyConfiguration(state);
  runtimeContext = null;

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
