import { Logging } from "homebridge";
import { useContext } from "../../jsx-runtime";
import { PluginContext } from "../pluginContext";

export const useLogger = (): Logging => useContext(PluginContext).logger;
