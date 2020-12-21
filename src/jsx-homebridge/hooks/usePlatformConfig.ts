import { useContext } from "../../jsx";
import { PlatformConfig } from "homebridge";
import { DynamicPlatformContext } from "../DynamicPlatformContext";

export const usePlatformConfig = <TConfig extends Record<string, any>>() =>
  useContext(DynamicPlatformContext).config as TConfig & PlatformConfig;
