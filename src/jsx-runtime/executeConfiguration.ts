import { withRuntimeContext } from "./runtimeContext";
import {
  Component,
  Configuration,
  EffectCallback,
  EffectCleanupCallback,
} from "./types";

export const executeConfiguration = <TState, TReturn>(
  root: Component<Configuration<TState, TReturn>>,
  state: TState
): [TReturn, EffectCleanupCallback] => {
  const effects: EffectCallback[] = [];

  const configuration = withRuntimeContext({ effects }, (context) =>
    root.getConfiguration(context)
  );

  if (configuration.length != 1) {
    throw new Error("expected a single root configuration");
  }

  const result = configuration[0](state);

  const cleanup = effects
    .map((effect) => effect())
    .filter(
      (cleanup): cleanup is EffectCleanupCallback =>
        typeof cleanup === "function"
    );

  const cleanupCallback = () => cleanup.forEach((cleanup) => cleanup());

  return [result, cleanupCallback];
};
