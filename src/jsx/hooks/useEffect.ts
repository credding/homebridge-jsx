import { getRuntimeContext } from "../runtime";
import { EffectCallback } from "../types";

export const useEffect = (effectCb: EffectCallback): void => {
  const { effects } = getRuntimeContext();
  effects.push(effectCb);
};
