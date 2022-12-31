import { ReactElement, ReactInstance, useEffect, useState } from "react";

export function withLoader(
  Component: ({ data }: any) => ReactElement,
  url: string
) {
  return (props: any) => {
    const [data, setData] = useState(null);

    useEffect(() => {
      setData(null);
      async function getData() {
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
      }

      getData();
    }, []);

    if (!data) {
      return <div>Loading...</div>;
    }

    return <Component {...props} data={data} />;
  };
}
