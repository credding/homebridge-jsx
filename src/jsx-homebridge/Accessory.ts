import { Component, configureChildren, WithChildren } from "../jsx";
import { Configuration } from "../jsx/types";
import { useHomebridgeApi } from "./hooks";
import { AccessoryConfiguration, ServiceConfiguration } from "./types";

export const Accessory = (
  props: WithChildren<Component<ServiceConfiguration>>
): Component<AccessoryConfiguration> => {
  const { children } = props;
  const { platformAccessory } = useHomebridgeApi();

  return new Component(
    (contextMap) =>
      new Configuration(() => {
        const accessory = new platformAccessory(
          "_",
          "00000000-0000-0000-0000-000000000000"
        );
        return configureChildren(children, contextMap, accessory);
      })
  );
};
