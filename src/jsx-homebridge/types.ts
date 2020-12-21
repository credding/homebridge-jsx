import { Characteristic, PlatformAccessory, Service } from "homebridge";
import { Configuration } from "../jsx";

export {
  Categories,
  Characteristic as HAPCharacteristic,
  PlatformAccessory,
  Service as HAPService,
} from "homebridge";

export type PlatformAccessories = {
  readonly accessories: ReadonlyArray<PlatformAccessory>;
};

export type DynamicPlatformConfiguration = Configuration<
  PlatformAccessories,
  PlatformAccessories
>;

export type AccessoryConfiguration = Configuration<
  PlatformAccessories,
  PlatformAccessory
>;

export type ServiceConfiguration = Configuration<PlatformAccessory, Service>;

export type CharacteristicConfiguration = Configuration<
  Service,
  Characteristic
>;
