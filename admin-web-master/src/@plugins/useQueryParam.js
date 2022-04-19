import { useEffect, useState } from 'react';

export const useQueryParams = () => {
  const [params, setParams] = useState({});

  useEffect(() => {
    const temp = {};
    new URLSearchParams(window.location.search).forEach((value, key) => {
      temp[key] = value;
    });
    setParams(temp);
  }, []);

  return params;
};
