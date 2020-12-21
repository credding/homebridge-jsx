import { runtimeContext } from "../runtime";
import { EffectCallback } from "../types";

export const useEffect = (effectCb: EffectCallback) => {
  const { effects } = runtimeContext.getStore()!;
  effects.push(effectCb);
};
