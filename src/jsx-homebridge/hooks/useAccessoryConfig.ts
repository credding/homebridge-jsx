import { AccessoryConfig } from "homebridge";
import { useContext } from "../../jsx";
import { AccessoryPluginContext, PluginContext } from "../PluginContext";

export const useAccessoryConfig = <
  TConfig extends Record<string, unknown>
>(): TConfig & AccessoryConfig =>
  (useContext(PluginContext) as AccessoryPluginContext)
    .accessoryConfig as TConfig & AccessoryConfig;
