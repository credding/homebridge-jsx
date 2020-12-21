import { RefObject } from "../types";

export const useRef = <T>(): RefObject<T> => ({ current: null });
