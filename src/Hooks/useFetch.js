import { useEffect, useState } from 'react';

export default function useFetch(url, requestOptions) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error('failed to fetch');
        return response.json();
      })
      .then((dataJson) => {
        setData(dataJson);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, requestOptions]);

  return { data, loading, error };
}
