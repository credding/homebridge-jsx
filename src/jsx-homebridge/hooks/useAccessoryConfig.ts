import { AccessoryConfig } from "homebridge";
import { useContext } from "../../jsx-runtime";
import { PluginContext } from "../pluginContext";
import { AccessoryPluginContext } from "../types";

export const useAccessoryConfig = <
  TConfig extends Record<string, unknown>
>(): TConfig & AccessoryConfig =>
  (useContext(PluginContext) as AccessoryPluginContext)
    .accessoryConfig as TConfig & AccessoryConfig;
