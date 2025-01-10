import { ReactElement } from "react";
import { NetworkStatusProvider } from "./NetworkStatusProvider";

export function withNetworkStatus(Component: (props: any) => ReactElement) {
  return (props: any) => {
    return (
      <NetworkStatusProvider>
        <Component {...props} />
      </NetworkStatusProvider>
    );
  };
}
