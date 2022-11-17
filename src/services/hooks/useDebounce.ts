import React, { useEffect, useState } from 'react';

export const useDebounce = (value: any, timeout: number) => {
  const [dbValue, setDbValue] = useState(value);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setDbValue(value);
    }, timeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, timeout]);

  return dbValue;
};
