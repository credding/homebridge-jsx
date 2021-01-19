import {
  AccessoryConfig,
  AccessoryPlugin,
  AccessoryPluginConstructor,
  API,
  APIEvent,
  Logging,
} from "homebridge";
import {
  Component,
  createComponent,
  EffectCleanupCallback,
  executeConfiguration,
} from "../jsx-runtime";
import { PluginContext } from "./pluginContext";
import { AccessoryConfiguration, AccessoryFactory } from "./types";

export const configureAccessory = <TConfig = AccessoryConfig>(
  accessory: Component<AccessoryConfiguration> | AccessoryFactory<TConfig>
): AccessoryPluginConstructor => {
  const accessoryFactory =
    typeof accessory === "function" ? accessory : () => accessory;

  return class extends JsxAccessoryPlugin<TConfig> {
    constructor(logger: Logging, config: AccessoryConfig, api: API) {
      super(accessoryFactory, logger, config as TConfig & AccessoryConfig, api);
    }
  };
};

class JsxAccessoryPlugin<TConfig> implements AccessoryPlugin {
  private cleanup?: EffectCleanupCallback;

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

    const [result, cleanup] = executeConfiguration(
      createComponent(PluginContext.Provider, {
        value: {
          logger: this.logger,
          accessoryConfig: this.config,
          api: this.api,
        },
        children: this.accessoryFactory(this.logger, this.config, this.api),
      }),
      undefined
    );

    this.cleanup = cleanup;

    return result;
  }

  private cleanupEffects() {
    if (typeof this.cleanup !== "undefined") {
      this.cleanup();
    }
  }
}
