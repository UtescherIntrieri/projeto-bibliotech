import { useState } from "react";

export function useTheme(initialState) {
  const [state, setState] = useState(() => {
    const storage = localStorage.getItem("themeLight");
    if (storage && storage === "false") {
      return true
    } else {
      return initialState;
    }
  });
  return [state, setState];
}