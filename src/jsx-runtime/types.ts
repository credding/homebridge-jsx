export type Configuration<TState, TReturn> = (state: TState) => TReturn;

export type OpaqueContext = unknown;

export type Component<TConfiguration = unknown> = {
  readonly getConfiguration: (context: OpaqueContext) => TConfiguration[];
};

export type ComponentFn<TProps, TConfiguration> = (
  props: TProps
) => Component<TConfiguration>;

export type Children<TChildren> = TChildren | undefined | Children<TChildren>[];

export type WithChildren<TChildren> = {
  readonly children?: Children<TChildren>;
};

export type ContextProviderProps<TValue> = {
  readonly value: TValue;
};

export type ContextProvider<TValue> = <TConfiguration>(
  props: ContextProviderProps<TValue> & WithChildren<Component<TConfiguration>>
) => Component<TConfiguration>;

export type Context<TValue> = {
  readonly Provider: ContextProvider<TValue>;
};

export type EffectCallback = () => EffectCleanupCallback | void;

export type EffectCleanupCallback = () => void;

export type RefObject<T> = { readonly current: T | null };

export type Ref<T> = { current: T | null };
