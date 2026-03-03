// hooks/useKeyboardShortcuts.ts

import { useEffect } from "react";
import type { UseKeyboardShortcutsProps } from "@/types/props";

export const useKeyboardShortcuts = ({
  handleRun,
}: UseKeyboardShortcutsProps): void => {
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRun();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleRun]);
};
