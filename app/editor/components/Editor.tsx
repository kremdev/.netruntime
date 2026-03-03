import { Play, Square, FileCode2 } from "lucide-react";
import type { EditorScreenProps } from "@/types/props";
import Editor from "@monaco-editor/react";

const EditorScreen = ({
  splitPos,
  code,
  setCode,
  isRunning,
  handleRun,
}: EditorScreenProps) => {
  return (
    <div className="flex flex-col" style={{ width: `${splitPos}%` }}>
      <div className="flex items-center h-10 bg-[#252526] border-b border-[#3c3c3c]">
        <div className="flex items-center gap-2 px-4 h-full bg-[#1e1e1e] border-t-2 border-t-[#007acc]">
          <FileCode2 size={14} className="text-[#519aba]" />
          <span className="text-sm font-mono text-[#cccccc]">Program.cs</span>
        </div>

        <div className="ml-auto flex items-center gap-2 pr-3">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-semibold tracking-wide uppercase transition-all duration-200 disabled:opacity-40 bg-[#0e639c] text-white hover:bg-[#1177bb] active:scale-95"
          >
            {isRunning ? (
              <>
                <Square size={12} className="animate-pulse" />
                <span>Running</span>
              </>
            ) : (
              <>
                <Play size={12} fill="currentColor" />
                <span>Run</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Editor
          language="csharp"
          value={code}
          onChange={(v) => setCode(v || "")}
          theme="real-vscode-dark"
          options={{
            fontSize: 15,
            fontFamily: '"JetBrains Mono", "Consolas", "Fira Code", monospace',
            fontLigatures: true,
            minimap: { enabled: false },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            cursorBlinking: "smooth",
            smoothScrolling: true,
            padding: { top: 12 },
            renderLineHighlight: "line",
            bracketPairColorization: { enabled: true },
          }}
        />
      </div>
    </div>
  );
};

export default EditorScreen;
