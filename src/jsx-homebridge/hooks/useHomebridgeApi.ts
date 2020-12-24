import { API } from "homebridge";
import { useContext } from "../../jsx";
import { PluginContext } from "../PluginContext";

export const useHomebridgeApi = (): API => useContext(PluginContext).api;
