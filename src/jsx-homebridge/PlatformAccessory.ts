import {
  Categories,
  PlatformAccessory as HPlatformAccessory,
} from "homebridge";
import {
  Component,
  configureChildren,
  Ref,
  RefObject,
  WithChildren,
} from "../jsx";
import { useHomebridgeApi } from "./hooks";
import { PlatformAccessoryConfiguration, ServiceConfiguration } from "./types";

type PlatformAccessoryProps = {
  name: string;
  uuid: string;
  category?: Categories;
  external?: boolean;
  ref?: RefObject<HPlatformAccessory>;
};

export const PlatformAccessory = (
  props: PlatformAccessoryProps & WithChildren<Component<ServiceConfiguration>>
): Component<PlatformAccessoryConfiguration> => {
  const { name, uuid, category, external, ref, children } = props;
  const { hap, platformAccessory } = useHomebridgeApi();

  return (contextMap) => (state) => {
    const accessory =
      state.accessories.find((accessory) => accessory.UUID === uuid) ??
      new platformAccessory(name, uuid, category);

    const informationService = accessory.getService(
      hap.Service.AccessoryInformation
    );
    const configuredServices = [
      informationService,
      ...configureChildren(children, contextMap, accessory),
    ];

    const removedServices = accessory.services.filter(
      (service) => !configuredServices.includes(service)
    );

    for (const service of removedServices) {
      accessory.removeService(service);
    }

    if (typeof ref !== "undefined") {
      (ref as Ref<HPlatformAccessory>).current = accessory;
    }

    return [{ external, accessory }];
  };
};

export const ExternalAccessory = (
  props: Omit<PlatformAccessoryProps, "external"> &
    WithChildren<Component<ServiceConfiguration>>
): Component<PlatformAccessoryConfiguration> =>
  PlatformAccessory({ ...props, external: true });
