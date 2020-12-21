import { WithUUID } from "homebridge";
import {
  configureChildren,
  Component,
  Ref,
  RefObject,
  WithChildren,
} from "../jsx";
import {
  CharacteristicConfiguration,
  HAPService,
  ServiceConfiguration,
} from "./types";

interface ServiceProps {
  type: WithUUID<typeof HAPService>;
  displayName?: string;
  subType?: string;
  primary?: boolean;
  ref?: RefObject<HAPService>;
}

export const Service = (
  props: ServiceProps & WithChildren<Component<CharacteristicConfiguration>>
): Component<ServiceConfiguration> => {
  const { type, displayName, subType, primary, ref, children } = props;

  return (contextMap) => async (state) => {
    var service =
      (typeof subType !== "undefined"
        ? state.getServiceById(type, subType)
        : state.getService(type)) ??
      state.addService(type, displayName, subType);

    if (primary === true) {
      service.setPrimaryService(true);
    }

    const requiredCharacteristics = service.characteristics.filter(
      (characteristic) =>
        !service.optionalCharacteristics.some(
          (optionalCharacteristic) =>
            optionalCharacteristic.UUID === characteristic.UUID
        )
    );
    const configuredCharacteristics = [
      ...requiredCharacteristics,
      ...(await configureChildren(children, contextMap, service)),
    ];

    const removedCharacteristics = service.characteristics.filter(
      (characteristic) => !configuredCharacteristics.includes(characteristic)
    );

    for (const characteristic of removedCharacteristics) {
      service.removeCharacteristic(characteristic);
    }

    if (typeof ref !== "undefined") {
      (ref as Ref<HAPService>).current = service;
    }

    return [service];
  };
};
