import { Component, WithChildren } from "../jsx-runtime";
import { AccessoryConfiguration, ServiceConfiguration } from "./types";
import { configureWithChildren } from "./configureWithChildren";
import { useHomebridgeApi } from "./hooks";

export const Accessory = (
  props: WithChildren<Component<ServiceConfiguration>>
): Component<AccessoryConfiguration> => {
  const { children } = props;
  const { platformAccessory } = useHomebridgeApi();

  return configureWithChildren((state, childConfigurations) => {
    const accessory = new platformAccessory(
      "_",
      "00000000-0000-0000-0000-000000000000"
    );

    return childConfigurations.map((configuration) => configuration(accessory));
  }, children);
};
