import { useState, useEffect } from "react";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(url, options);
        const result = await response.json();

        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;