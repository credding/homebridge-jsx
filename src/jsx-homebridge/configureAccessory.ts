import {
  AccessoryConfig,
  AccessoryPlugin,
  AccessoryPluginConstructor,
  API,
  APIEvent,
  Logging,
} from "homebridge";
import { CleanupCallback, Component } from "../jsx";
import { applyConfiguration, createConfiguration } from "../jsx/runtime";
import { PluginContext } from "./PluginContext";
import { AccessoryConfiguration, AccessoryFactory } from "./types";

const isFactory = <TConfig>(
  platform: Component<AccessoryConfiguration> | AccessoryFactory<TConfig>
): platform is AccessoryFactory<TConfig> => typeof platform === "function";

export const configureAccessory = <TConfig = AccessoryConfig>(
  accessory: Component<AccessoryConfiguration>
): AccessoryPluginConstructor => {
  const accessoryFactory = isFactory(accessory) ? accessory : () => accessory;

  return class extends JsxAccessoryPlugin<TConfig> {
    constructor(logger: Logging, config: AccessoryConfig, api: API) {
      super(accessoryFactory, logger, config as TConfig & AccessoryConfig, api);
    }
  };
};

class JsxAccessoryPlugin<TConfig> implements AccessoryPlugin {
  private cleanup?: CleanupCallback;

  constructor(
    private readonly accessoryFactory: AccessoryFactory<TConfig>,
    private readonly logger: Logging,
    private readonly config: TConfig & AccessoryConfig,
    private readonly api: API
  ) {
    api.on(APIEvent.SHUTDOWN, () => this.cleanupEffects());
  }

  getServices() {
    return this.configureAccessory();
  }

  private configureAccessory() {
    this.cleanupEffects();

    const [result, cleanup] = applyConfiguration(
      createConfiguration(PluginContext.Provider, {
        value: {
          logger: this.logger,
          accessoryConfig: this.config,
          api: this.api,
        },
        children: this.accessoryFactory(this.logger, this.config, this.api),
      }),
      { accessories: [] }
    );

    this.cleanup = cleanup;

    return result.map((accessory) => accessory.services).flat();
  }

  private cleanupEffects() {
    if (typeof this.cleanup !== "undefined") {
      this.cleanup();
    }
  }
}
