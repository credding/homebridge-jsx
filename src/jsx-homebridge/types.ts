import {
  AccessoryConfig,
  API,
  Characteristic,
  Logging,
  PlatformAccessory,
  PlatformConfig,
  Service,
} from "homebridge";
import { Component, Configuration } from "../jsx-runtime";

export type DynamicPlatformState = {
  readonly accessories: ReadonlyArray<PlatformAccessory>;
};

export type DynamicPlatformConfiguration = Configuration<
  DynamicPlatformState,
  DynamicPlatformState
>;

export type AccessoryWithScope = {
  readonly accessory: PlatformAccessory;
  readonly external?: boolean;
};

export type PlatformAccessoryConfiguration = Configuration<
  DynamicPlatformState,
  AccessoryWithScope
>;

export type AccessoryConfiguration = Configuration<undefined, Service[]>;

export type ServiceConfiguration = Configuration<PlatformAccessory, Service>;

export type CharacteristicConfiguration = Configuration<
  Service,
  Characteristic
>;

export type DynamicPlatformFactory<TConfig> = (
  logger: Logging,
  config: TConfig,
  api: API
) =>
  | Component<DynamicPlatformConfiguration>
  | Promise<Component<DynamicPlatformConfiguration>>;

export type AccessoryFactory<TConfig> = (
  logger: Logging,
  config: TConfig,
  api: API
) => Component<AccessoryConfiguration>;

export type AccessoryPluginContext = {
  readonly logger: Logging;
  readonly accessoryConfig: AccessoryConfig;
  readonly api: API;
};

export type PlatformPluginContext = {
  readonly logger: Logging;
  readonly platformConfig: PlatformConfig;
  readonly api: API;
};

export type PluginContext = AccessoryPluginContext | PlatformPluginContext;
