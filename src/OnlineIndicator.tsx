import { useNetworkStatus } from "./hooks/useNetworkStatus";

export const OnlineIndicator = () => {
  const { isOnline } = useNetworkStatus();

  if (isOnline) {
    return null;
  }

  return (
    <div
      className="fixed top-4 right-4 p-3 text-center bg-gray-200 dark:bg-gray-600 rounded-md shadow-sm"
      role="status"
      aria-live="polite"
    >
      You're offline
    </div>
  );
};
