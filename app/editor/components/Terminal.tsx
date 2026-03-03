import { TerminalScreenProps } from "@/types/props";
import { Terminal, Trash2 } from "lucide-react";
import React from "react";

const TerminalSecreen = ({
  isRunning,
  hasReadLine,
  output,
  setOutput,
  outputRef,
  inputRef,
  currentLine,
  setCurrentLine,
  handleKey,
}: TerminalScreenProps) => {
  return (
    <div className="flex flex-col flex-1 min-w-0 bg-[#1e1e1e]">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 h-9 bg-[#252526] border-b border-[#3c3c3c]">
        <Terminal size={14} className="text-[#cccccc]" />
        <span className="text-xs font-mono uppercase tracking-wider text-[#cccccc]">
          Terminal
        </span>

        {isRunning && hasReadLine && (
          <span className="text-xs text-[#dcdcaa] ml-2 animate-pulse">
            ⌨ Waiting for input...
          </span>
        )}

        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={() => setOutput("")}
            className="p-1 rounded hover:bg-[#3c3c3c] text-[#858585] hover:text-[#cccccc] transition-colors"
            title="Clear terminal"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={outputRef}
        className="flex-1 overflow-auto p-4 font-mono text-sm leading-relaxed cursor-text"
        onClick={() => isRunning && hasReadLine && inputRef.current?.focus()}
      >
        {output ? (
          <pre className="whitespace-pre-wrap text-[#cccccc] m-0">{output}</pre>
        ) : (
          <div className="text-[#858585]">
            <span className="text-[#569cd6]">{">"}</span> Click{" "}
            <span className="text-[#dcdcaa]">▶ Run</span> to execute your code
            {"\n"}
            {hasReadLine && (
              <>
                <span className="text-[#569cd6]">{">"}</span> Your code uses{" "}
                <span className="text-[#4ec9b0]">Console.ReadLine()</span> —
                type input directly in the terminal
                {"\n"}
              </>
            )}
            <span className="text-[#569cd6]">{">"}</span> Press{" "}
            <span className="text-[#ce9178]">Ctrl+Enter</span> to run quickly
          </div>
        )}

        {isRunning && hasReadLine && (
          <div className="flex items-center mt-1">
            <span className="text-[#6a9955] mr-2">{">"}</span>
            <input
              ref={inputRef}
              type="text"
              value={currentLine}
              onChange={(e) => setCurrentLine(e.target.value)}
              onKeyDown={handleKey}
              className="flex-1 bg-transparent text-[#e5c07b] outline-none border-none caret-[#e5c07b] font-mono text-sm"
              autoFocus
              spellCheck={false}
            />
            <span className="text-[#e5c07b] animate-blink">▌</span>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="flex items-center h-6 px-3 bg-[#007acc] text-white text-xs font-mono gap-4">
        <span>C# (.NET)</span>
        <span>UTF-8</span>
        <span className="ml-auto">
          {isRunning && hasReadLine
            ? "● Awaiting Input"
            : isRunning
              ? "● Running"
              : "● Ready"}
        </span>
      </div>
    </div>
  );
};

export default TerminalSecreen;
