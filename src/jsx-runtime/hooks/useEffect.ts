import { getRuntimeContext } from "../runtimeContext";
import { EffectCallback } from "../types";

export const useEffect = (effect: EffectCallback): void => {
  const { effects } = getRuntimeContext();
  effects.push(effect);
};
