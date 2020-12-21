import { API, Logging, PlatformConfig } from "homebridge";
import { createContext } from "../jsx";

type DynamicPlatformContext = {
  readonly logger: Logging;
  readonly config: PlatformConfig;
  readonly api: API;
};

export const DynamicPlatformContext = createContext<DynamicPlatformContext>();
