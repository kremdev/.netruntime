// hooks/useVSCodeTheme.ts

import { useEffect } from "react";
import { useMonaco } from "@monaco-editor/react";
import type { UseThemeReturn } from "@/types/props";

export const useVSCodeTheme = (): UseThemeReturn => {
  const monaco = useMonaco();

  const defineVSCodeTheme = () => {
    if (!monaco) return;

    monaco.editor.defineTheme("real-vscode-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "keyword.control", foreground: "C586C0" },
        { token: "keyword", foreground: "569CD6" },
        { token: "string", foreground: "CE9178" },
        { token: "comment", foreground: "6A9955" },
        { token: "number", foreground: "B5CEA8" },
        { token: "type", foreground: "4EC9B0" },
      ],
      colors: {
        "editor.background": "#1E1E1E",
        "editor.foreground": "#D4D4D4",
        "editorLineNumber.foreground": "#858585",
        "editorCursor.foreground": "#AEAFAD",
        "editor.selectionBackground": "#264F78",
      },
    });
    monaco.editor.setTheme("real-vscode-dark");
  };

  useEffect(() => {
    defineVSCodeTheme();
  }, [monaco]);

  return { defineVSCodeTheme };
};
