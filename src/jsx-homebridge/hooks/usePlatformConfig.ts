import { PlatformConfig } from "homebridge";
import { useContext } from "../../jsx-runtime";
import { PluginContext } from "../pluginContext";
import { PlatformPluginContext } from "../types";

export const usePlatformConfig = <
  TConfig extends Record<string, unknown>
>(): TConfig & PlatformConfig =>
  (useContext(PluginContext) as PlatformPluginContext)
    .platformConfig as TConfig & PlatformConfig;
