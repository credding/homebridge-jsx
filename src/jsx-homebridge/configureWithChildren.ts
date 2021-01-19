import {
  Children,
  Component,
  Configuration,
  getChildConfigurations,
} from "../jsx-runtime";

export const configureWithChildren = <TState, TChildConfiguration, TReturn>(
  configuration: (
    state: TState,
    childConfigurations: TChildConfiguration[]
  ) => TReturn,
  children?: Children<Component<TChildConfiguration>>
): Component<Configuration<TState, TReturn>> => ({
  getConfiguration: (context) => {
    const childConfigurations = getChildConfigurations(children, context);
    return [(state) => configuration(state, childConfigurations)];
  },
});
