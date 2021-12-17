import { useState } from "react";

const useHttp = (url, applyData, config = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const sendRequest = async () => {
    setIsLoading(true);
    setError(null);
    const method = config.method || "GET";
    const headers = config.headers || {};
    const body = config.body ? JSON.stringify(config.body) : null;

    try {
      const response = await fetch(url, {
        method,
        headers,
        body,
      });
      if (!response.ok) throw new Error("Request Failed!");

      const result = await response.json();
      applyData(result);

      setIsLoading(false);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
  };

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
