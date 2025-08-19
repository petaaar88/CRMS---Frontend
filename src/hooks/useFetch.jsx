import { useState, useEffect } from "react";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    setLoading(true);
    setData(null);
    setError(null);

    fetch(url, { ...options })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const result = await res.json();

        
        if (result.content) {
          setData(result.content);
        } else if (result.data) {
          setData(result.data);
        } else {
          setData(result);
        }

        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "An error occurred. Awkward..");
        setLoading(false);
      });
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
};

export default useFetch;
