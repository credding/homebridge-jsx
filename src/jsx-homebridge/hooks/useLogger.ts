import { Logging } from "homebridge";
import { useContext } from "../../jsx";
import { PluginContext } from "../PluginContext";

export const useLogger = (): Logging => useContext(PluginContext).logger;
