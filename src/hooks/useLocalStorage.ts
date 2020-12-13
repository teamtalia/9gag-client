import { useState } from 'react';

const useLocalStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      if (process.env.NODE_ENV === 'development')
        console.log('error::hooks@userLocalStorage:get ->', error);
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      if (process.env.NODE_ENV === 'development')
        console.log('error::hooks@userLocalStorage:set ->', error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
