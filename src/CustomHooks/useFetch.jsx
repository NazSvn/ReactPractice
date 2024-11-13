import { useCallback, useEffect, useState } from 'react';

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const stableOptions = JSON.stringify(options);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setData(null);
    setError(null);

    try {
      const parsedOptions = JSON.parse(stableOptions);
      const response = await fetch(url, { ...parsedOptions });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [url, stableOptions]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading, refetch: fetchData };
};

export default useFetch;
