import { useContext } from "../../jsx";
import { DynamicPlatformContext } from "../DynamicPlatformContext";

export const useLogger = () => useContext(DynamicPlatformContext).logger;
