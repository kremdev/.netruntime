// app/page.tsx

"use client";

import { useState } from "react";
import csdefaultcode from "@/cs/default.cs";

// Hooks
import { useCodeRunner } from "../hooks/useCodeRunner";
import { useVSCodeTheme } from "../hooks/useVSCodeTheme";
import { useSplitResize } from "../hooks/useSplitResize";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import { useReadLineDetection } from "../hooks/useReadLineDetection";

// Components
import EditorScreen from "./components/Editor";
import Resizer from "./components/Resizer";
import TerminalScreen from "./components/Terminal";

const EditorPage = () => {
  const [code, setCode] = useState<string>(csdefaultcode);

  useVSCodeTheme();
  const { splitPos, onMouseDown } = useSplitResize();
  const hasReadLine = useReadLineDetection(code);

  const {
    output,
    setOutput,
    isRunning,
    currentLine,
    setCurrentLine,
    outputRef,
    inputRef,
    handleRun,
    handleKey,
  } = useCodeRunner(code, hasReadLine);

  useKeyboardShortcuts({ handleRun });

  return (
    <div className="flex h-screen w-screen overflow-hidden select-none bg-[#181818]">
      <EditorScreen
        splitPos={splitPos}
        code={code}
        setCode={setCode}
        isRunning={isRunning}
        handleRun={handleRun}
      />
      <Resizer onMouseDown={onMouseDown} />
      <TerminalScreen
        isRunning={isRunning}
        hasReadLine={hasReadLine}
        output={output}
        setOutput={setOutput}
        outputRef={outputRef}
        inputRef={inputRef}
        currentLine={currentLine}
        setCurrentLine={setCurrentLine}
        handleKey={handleKey}
      />
    </div>
  );
};

export default EditorPage;
