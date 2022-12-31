import { createContext, useEffect, useState } from "react";

interface NetworkContext {
  isOnline: boolean;
  setIsOnline: (isOnline: boolean) => void;
}

export const NetworkContext = createContext<NetworkContext | null>(null);

interface NetworkStatusProviderProps {}

export function NetworkStatusProvider(props: NetworkStatusProviderProps) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const setOnline = () => {
      debugger;
      setIsOnline(true);
    };
    const setOffline = () => {
      debugger;
      setIsOnline(false);
    };

    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);
  const value = { isOnline, setIsOnline };

  return <NetworkContext.Provider value={value} {...props} />;
}
