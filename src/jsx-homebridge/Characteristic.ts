import {
  CharacteristicEventTypes,
  CharacteristicGetCallback,
  CharacteristicSetCallback,
  CharacteristicValue,
  Nullable,
  WithUUID,
} from "homebridge";
import { Component, Ref, RefObject } from "../jsx";
import { CharacteristicConfiguration, HAPCharacteristic } from "./types";

type CharacteristicProps<T extends CharacteristicValue> = {
  type: WithUUID<{ new (): HAPCharacteristic }>;
  onGet?: () => Promise<T>;
  onSet?: (value: T) => Promise<void>;
  ref?: RefObject<HAPCharacteristic>;
};

export const Characteristic = <T extends CharacteristicValue>(
  props: CharacteristicProps<T>
): Component<CharacteristicConfiguration> => {
  const { type, onGet, onSet, ref } = props;

  return (_) => async (state) => {
    var characteristic = state.getCharacteristic(type);

    characteristic.removeAllListeners();

    if (typeof onGet === "function") {
      const getListener = (callback: CharacteristicGetCallback<Nullable<T>>) =>
        onGet().then(
          (value) => callback(null, value),
          (error) => callback(error)
        );

      characteristic.on(CharacteristicEventTypes.GET, getListener);
    }

    if (typeof onSet === "function") {
      const setListener = (
        value: CharacteristicValue,
        callback: CharacteristicSetCallback
      ) =>
        onSet(value as T).then(
          () => callback(),
          (error) => callback(error)
        );

      characteristic.on(CharacteristicEventTypes.SET, setListener);
    }

    if (typeof ref !== "undefined") {
      (ref as Ref<HAPCharacteristic>).current = characteristic;
    }

    return [characteristic];
  };
};

export const StringCharacteristic = (props: CharacteristicProps<string>) =>
  Characteristic(props);

export const NumberCharacteristic = (props: CharacteristicProps<number>) =>
  Characteristic(props);

export const BooleanCharacteristic = (props: CharacteristicProps<boolean>) =>
  Characteristic(props);
