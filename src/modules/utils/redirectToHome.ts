import { useCallback } from "react";

export const useRedirectToHome = () => {
  return useCallback((path: string, { open = false, replace = false } = {}) => {
    if (open) {
      window.open(`${import.meta.env.VITE_HOME_MULEARN_URL}${path.replace(/^\/+/, "")}`, "_blank");
      return;
    }
    if (replace) {
      window.location.replace(`${import.meta.env.VITE_HOME_MULEARN_URL}${path.replace(/^\/+/, "")}`);
      return;
    }
    window.location.href = `${import.meta.env.VITE_HOME_MULEARN_URL}${path.replace(/^\/+/, "")}`;
  }, []);
};