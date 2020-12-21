import {
  Component,
  configureChildren,
  Ref,
  RefObject,
  WithChildren,
} from "../jsx";
import { useHomebridgeApi } from "./hooks";
import {
  AccessoryConfiguration,
  Categories,
  PlatformAccessory,
  ServiceConfiguration,
} from "./types";

type AccessoryProps = {
  name: string;
  uuid: string;
  category?: Categories;
  ref?: RefObject<PlatformAccessory>;
};

export const Accessory = (
  props: AccessoryProps & WithChildren<Component<ServiceConfiguration>>
): Component<AccessoryConfiguration> => {
  const { name, uuid, category, ref, children } = props;
  const { hap, platformAccessory } = useHomebridgeApi();

  return (contextMap) => async (state) => {
    const accessory =
      state.accessories.find((accessory) => accessory.UUID == uuid) ??
      new platformAccessory(name, uuid, category);

    const informationService = accessory.getService(
      hap.Service.AccessoryInformation
    )!;
    const configuredServices = [
      informationService,
      ...(await configureChildren(children, contextMap, accessory)),
    ];

    const removedServices = accessory.services.filter(
      (service) => !configuredServices.includes(service)
    );

    for (const service of removedServices) {
      accessory.removeService(service);
    }

    if (typeof ref !== "undefined") {
      (ref as Ref<PlatformAccessory>).current = accessory;
    }

    return [accessory];
  };
};
