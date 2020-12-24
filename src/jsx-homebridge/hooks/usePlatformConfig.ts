import { PlatformConfig } from "homebridge";
import { useContext } from "../../jsx";
import { PlatformPluginContext, PluginContext } from "../PluginContext";

export const usePlatformConfig = <
  TConfig extends Record<string, unknown>
>(): TConfig & PlatformConfig =>
  (useContext(PluginContext) as PlatformPluginContext)
    .platformConfig as TConfig & PlatformConfig;
