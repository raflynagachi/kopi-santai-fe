import { useEffect, useState } from 'react';

export default function useFetch(url, requestOptions) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setData(result);
        } else {
          setError(result);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, requestOptions]);

  return { data, loading, error };
}
