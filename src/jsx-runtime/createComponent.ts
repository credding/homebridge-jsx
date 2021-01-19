import { withRuntimeContext } from "./runtimeContext";
import { RuntimeContext } from "./runtimeTypes";
import { Component, ComponentFn } from "./types";

export const createComponent = <TProps, TConfiguration>(
  componentFn: ComponentFn<TProps, TConfiguration>,
  props: TProps
): Component<TConfiguration> => ({
  getConfiguration: (context) =>
    withRuntimeContext(context as RuntimeContext, (context) =>
      componentFn(props).getConfiguration(context)
    ),
});
