import { useState, useCallback } from 'react';

const useFetchUsers = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_REACT_APP_APIGATEWAY_URL;

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${apiUrl}/users/user`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setResult(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl]);

  return { fetchUsers, result, error, isLoading };
};

export default useFetchUsers;