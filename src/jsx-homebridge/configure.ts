import {
  API,
  APIEvent,
  DynamicPlatformPlugin,
  Logging,
  PlatformAccessory,
  PlatformConfig,
  PlatformPluginConstructor,
} from "homebridge";
import { CleanupCallback, Component } from "../jsx";
import { createConfiguration, executeConfiguration } from "../jsx/runtime";
import { DynamicPlatformContext } from "./DynamicPlatformContext";
import { DynamicPlatformConfiguration, PlatformAccessories } from "./types";

export const configure = (
  platform: Component<DynamicPlatformConfiguration>
): PlatformPluginConstructor => {
  return class extends JsxDynamicPlatform {
    constructor(logger: Logging, config: PlatformConfig, api: API) {
      super(platform, logger, config, api);
    }
  };
};

class JsxDynamicPlatform implements DynamicPlatformPlugin, PlatformAccessories {
  accessories: PlatformAccessory[] = [];
  private cleanup?: CleanupCallback;

  constructor(
    private readonly platform: Component<DynamicPlatformConfiguration>,
    private readonly logger: Logging,
    private readonly config: PlatformConfig,
    private readonly api: API
  ) {
    api.on(APIEvent.DID_FINISH_LAUNCHING, () => this.configurePlatform());
    api.on(APIEvent.SHUTDOWN, () => this.cleanupEffects());
  }

  configureAccessory(accessory: PlatformAccessory): void {
    this.accessories.push(accessory);
  }

  private async configurePlatform() {
    this.cleanupEffects();

    const [result, cleanup] = await executeConfiguration(
      createConfiguration(DynamicPlatformContext.Provider, {
        value: {
          logger: this.logger,
          config: this.config,
          api: this.api,
        },
        children: this.platform,
      }),
      this
    );

    this.accessories = result.map((result) => result.accessories).flat();
    this.cleanup = cleanup;
  }

  private cleanupEffects() {
    if (typeof this.cleanup !== "undefined") {
      this.cleanup();
    }
  }
}
