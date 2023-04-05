import { useState, useEffect } from "react";

export function useTheme (key, initialState) {
  const INITIAL_STATE = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    isFetching: false,
    error: false,
  }
  const [state, setState] = useState(() => {
    const storage = localStorage.getItem(INITIAL_STATE);
    if (storage) {
      return JSON.parse(storage);
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
