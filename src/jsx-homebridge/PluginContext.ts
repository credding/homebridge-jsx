import { AccessoryConfig, API, Logging, PlatformConfig } from "homebridge";
import { createContext } from "../jsx";

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

export const PluginContext = createContext<PluginContext>();
