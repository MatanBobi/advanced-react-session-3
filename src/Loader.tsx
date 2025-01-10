export const Loader = ({
  isLoading,
  isError,
  children,
}: {
  isLoading?: boolean;
  isError?: boolean;
  children: React.ReactNode;
}) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return <>{children}</>;
};
