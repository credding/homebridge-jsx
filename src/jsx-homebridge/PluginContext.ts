import { createContext } from "../jsx-runtime";
import { PluginContext as PluginContextType } from "./types";

export const PluginContext = createContext<PluginContextType>();
