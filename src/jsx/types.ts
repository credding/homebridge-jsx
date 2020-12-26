import { ContextMap } from "./runtimeTypes";

export class Configuration<TState, TReturn> {
  constructor(public applyConfiguration: (state: TState) => TReturn[]) {}
}

export class Component<TConfiguration> {
  constructor(
    public getConfiguration: (contextMap: ContextMap) => TConfiguration
  ) {}
}

export type ComponentFn<TProps, TConfiguration> = (
  props: TProps
) => Component<TConfiguration>;

export type Children<TChildren> = TChildren | TChildren[] | undefined;

export type WithChildren<TChildren> = {
  readonly children?: Children<TChildren>;
};

export type ContextProviderProps<TValue> = {
  readonly value: TValue;
};

export type ContextProvider<TValue> = <TState, TReturn>(
  props: ContextProviderProps<TValue> &
    WithChildren<Component<Configuration<TState, TReturn>>>
) => Component<Configuration<TState, TReturn>>;

export type Context<TValue> = {
  readonly Provider: ContextProvider<TValue>;
};

export type Ref<T> = {
  current: T | null;
};

export type RefObject<T> = {
  readonly current: T | null;
};

export type EffectCallback = () => CleanupCallback | void;

export type CleanupCallback = () => void;
