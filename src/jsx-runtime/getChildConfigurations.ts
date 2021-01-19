import { Children, Component, OpaqueContext } from "./types";

export const getChildConfigurations = <TConfiguration>(
  children: Children<Component<TConfiguration>>,
  context: OpaqueContext
): TConfiguration[] => {
  if (typeof children === "undefined") {
    return [];
  }

  if (Array.isArray(children)) {
    return children.flatMap((child) => getChildConfigurations(child, context));
  }

  return children.getConfiguration(context);
};
