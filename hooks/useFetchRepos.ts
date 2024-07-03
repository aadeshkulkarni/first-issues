import React, { useState } from "react";

const useFetch = <ResponseType>({
  url,
  key = url,
}: {
  url: string;
  key?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ResponseType | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [paginationData, setpaginationData] = useState<any>(undefined);

  const fetcher = async () => {
    setIsLoading(true);
    try {
      const resJSON = await fetch(url);
      const res = await resJSON.json();
      let { data, ...rest} = res; 
      setpaginationData({...rest});
      setData(data);
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
    paginationData,
    refetch: fetch,
  };
};

export default useFetch;
