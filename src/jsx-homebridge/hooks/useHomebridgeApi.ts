import { API } from "homebridge";
import { useContext } from "../../jsx-runtime";
import { PluginContext } from "../pluginContext";

export const useHomebridgeApi = (): API => useContext(PluginContext).api;
