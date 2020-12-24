import {
  API,
  Characteristic,
  Logging,
  PlatformAccessory,
  Service,
} from "homebridge";
import { Component, Configuration } from "../jsx";

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

export type MaybePromise<T> = T | Promise<T>;

export type DynamicPlatformFactory<TConfig> = (
  logger: Logging,
  config: TConfig,
  api: API
) => MaybePromise<Component<DynamicPlatformConfiguration>>;

export type AccessoryFactory<TConfig> = (
  logger: Logging,
  config: TConfig,
  api: API
) => Component<AccessoryConfiguration>;
