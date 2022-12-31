import { useReducer } from "react";

export function useForceRerender() {
  return useReducer((x) => x + 1, 0)[1];
}
