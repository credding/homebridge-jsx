import { useContext } from "../../jsx";
import { DynamicPlatformContext } from "../DynamicPlatformContext";

export const useHomebridgeApi = () => useContext(DynamicPlatformContext).api;
