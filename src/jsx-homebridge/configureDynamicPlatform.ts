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
import { applyConfiguration, createConfiguration } from "../jsx/runtime";
import { PluginContext } from "./PluginContext";
import {
  DynamicPlatformConfiguration,
  DynamicPlatformFactory,
  PlatformAccessories,
} from "./types";

export const configureDynamicPlatform = <TConfig = PlatformConfig>(
  platform:
    | Component<DynamicPlatformConfiguration>
    | DynamicPlatformFactory<TConfig>
): PlatformPluginConstructor => {
  const platformFactory =
    typeof platform === "function" ? platform : () => platform;

  return class extends JsxDynamicPlatformPlugin<TConfig> {
    constructor(logger: Logging, config: PlatformConfig, api: API) {
      super(platformFactory, logger, config as TConfig & PlatformConfig, api);
    }
  };
};

class JsxDynamicPlatformPlugin<TConfig>
  implements DynamicPlatformPlugin, PlatformAccessories {
  accessories: PlatformAccessory[] = [];
  private cleanup?: CleanupCallback;

  constructor(
    private readonly platformFactory: DynamicPlatformFactory<TConfig>,
    private readonly logger: Logging,
    private readonly config: TConfig & PlatformConfig,
    private readonly api: API
  ) {
    api.on(APIEvent.DID_FINISH_LAUNCHING, () => void this.configurePlatform());
    api.on(APIEvent.SHUTDOWN, () => this.cleanupEffects());
  }

  configureAccessory(accessory: PlatformAccessory): void {
    this.accessories.push(accessory);
  }

  private async configurePlatform() {
    this.cleanupEffects();

    const [result, cleanup] = applyConfiguration(
      createConfiguration(PluginContext.Provider, {
        value: {
          logger: this.logger,
          platformConfig: this.config,
          api: this.api,
        },
        children: await this.platformFactory(
          this.logger,
          this.config,
          this.api
        ),
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
