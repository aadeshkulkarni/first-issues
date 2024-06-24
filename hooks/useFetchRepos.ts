import React from "react";

const useFetch = <ResponseType>({
  url,
  key = url,
}: {
  url: string;
  key?: string;
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<ResponseType | undefined>(undefined);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const fetcher = async () => {
    setIsLoading(true);
    try {
      const resJSON = await fetch(url);
      const res = await resJSON.json();
      setData(res);
    } catch (err) {
      setError((err as Error)?.message);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    // Fetch data on mount
    fetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return {
    isLoading,
    data,
    error,
    refetch: fetch,
  };
};

export default useFetch;
