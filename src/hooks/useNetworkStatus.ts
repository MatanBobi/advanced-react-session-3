import { use } from "react";
import { NetworkContext } from "../NetworkStatusProvider";

export function useNetworkStatus() {
  const context = use(NetworkContext);

  if (!context) {
    throw new Error(
      `useNetworkStatus must be used in a NetworkStatusProvider component`
    );
  }

  return context;
}
