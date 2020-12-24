import { PlatformName, PluginIdentifier } from "homebridge";
import { Component, configureChildren, WithChildren } from "../jsx";
import { useHomebridgeApi } from "./hooks";
import { AccessoryConfiguration, DynamicPlatformConfiguration } from "./types";

type DynamicPlatformProps = {
  pluginIdentifier: PluginIdentifier;
  platformName: PlatformName;
};

export const DynamicPlatform = (
  props: DynamicPlatformProps & WithChildren<Component<AccessoryConfiguration>>
): Component<DynamicPlatformConfiguration> => {
  const { pluginIdentifier, platformName, children } = props;
  const api = useHomebridgeApi();

  return (context) => (state) => {
    const configuredAccessories = configureChildren(children, context, state);

    const newAccessories = configuredAccessories.filter(
      (accessory) => !state.accessories.includes(accessory)
    );

    const missingAccessories = state.accessories.filter(
      (accessory) => !configuredAccessories.includes(accessory)
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

    return [{ accessories: configuredAccessories }];
  };
};
