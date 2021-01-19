import { PlatformName, PluginIdentifier } from "homebridge";
import { Component, WithChildren } from "../jsx-runtime";
import { configureWithChildren } from "./configureWithChildren";
import { useHomebridgeApi } from "./hooks";
import {
  DynamicPlatformConfiguration,
  PlatformAccessoryConfiguration,
} from "./types";

type DynamicPlatformProps = {
  pluginIdentifier: PluginIdentifier;
  platformName: PlatformName;
};

export const DynamicPlatform = (
  props: DynamicPlatformProps &
    WithChildren<Component<PlatformAccessoryConfiguration>>
): Component<DynamicPlatformConfiguration> => {
  const { pluginIdentifier, platformName, children } = props;
  const api = useHomebridgeApi();

  return configureWithChildren((state, childConfigurations) => {
    const configuredAccessories = childConfigurations.map((configuration) =>
      configuration(state)
    );

    const platformAccessories = configuredAccessories
      .filter((accessory) => !accessory.external)
      .map((accessory) => accessory.accessory);

    const newAccessories = platformAccessories.filter(
      (accessory) => !state.accessories.includes(accessory)
    );

    const missingAccessories = state.accessories.filter(
      (accessory) => !platformAccessories.includes(accessory)
    );

    api.registerPlatformAccessories(
      pluginIdentifier,
      platformName,
      newAccessories
    );

    api.unregisterPlatformAccessories(
      pluginIdentifier,
      platformName,
      missingAccessories
    );

    const externalAccessories = configuredAccessories
      .filter((accessory) => accessory.external)
      .map((accessory) => accessory.accessory);

    api.publishExternalAccessories(pluginIdentifier, externalAccessories);

    return { accessories: platformAccessories };
  }, children);
};
