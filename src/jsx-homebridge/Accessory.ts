import { Component, configureChildren, WithChildren } from "../jsx";
import { useHomebridgeApi } from "./hooks";
import { AccessoryConfiguration, ServiceConfiguration } from "./types";

export const Accessory = (
  props: WithChildren<Component<ServiceConfiguration>>
): Component<AccessoryConfiguration> => {
  const { children } = props;
  const { platformAccessory } = useHomebridgeApi();

  return (contextMap) => () => {
    const accessory = new platformAccessory(
      "_",
      "00000000-0000-0000-0000-000000000000"
    );
    return configureChildren(children, contextMap, accessory);
  };
};
