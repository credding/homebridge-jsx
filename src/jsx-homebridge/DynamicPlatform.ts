import { PlatformName, PluginIdentifier } from "homebridge";
import { configureChildren, Component, WithChildren } from "../jsx";
import { AccessoryConfiguration, DynamicPlatformConfiguration } from "./types";
import { useHomebridgeApi } from "./hooks";

type DynamicPlatformProps = {
  pluginIdentifier: PluginIdentifier;
  platformName: PlatformName;
};

export const DynamicPlatform = (
  props: DynamicPlatformProps & WithChildren<Component<AccessoryConfiguration>>
): Component<DynamicPlatformConfiguration> => {
  const { pluginIdentifier, platformName, children } = props;
  const api = useHomebridgeApi();

  return (context) => async (state) => {
    const configuredAccessories = await configureChildren(
      children,
      context,
      state
    );

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
