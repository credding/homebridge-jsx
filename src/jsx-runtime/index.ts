import { createComponent } from "./createComponent";

export { createComponent } from "./createComponent";
export { createContext } from "./createContext";
export { executeConfiguration } from "./executeConfiguration";
export { getChildConfigurations } from "./getChildConfigurations";
export { useContext, useEffect, useRef } from "./hooks";
export {
  Children,
  Component,
  ComponentFn,
  Configuration,
  Context,
  ContextConsumer,
  ContextConsumerProps,
  ContextProvider,
  ContextProviderProps,
  EffectCallback,
  EffectCleanupCallback,
  OpaqueContext,
  Ref,
  RefObject,
  WithChildren,
} from "./types";

export const jsx = createComponent;
export const jsxs = createComponent;
