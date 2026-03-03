"use client";
import { useState, useEffect } from "react";

const CodeWindow = () => {
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-3xl rounded-[8px] overflow-hidden shadow-2xl border border-[#2d2d2d] bg-[#1e1e1e]">
      <div className="flex items-center gap-3 px-5 py-3 bg-[#252526] border-b border-[#2d2d2d]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>

        <div className="flex-1 flex justify-center text-xs font-mono text-[#cccccc]">
          Program.cs
        </div>

        <div className="text-[10px] font-semibold text-[#bec3c7]">C#</div>
      </div>

      <div className="flex font-mono text-sm leading-7">
        <div
          className="select-none py-6 px-4 text-right text-[#858585] bg-[#1e1e1e]"
          style={{ minWidth: 44 }}
        >
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        <div className="py-6 px-6 flex-1 text-left text-[#d4d4d4]">
          <div>
            <span className="text-[#569cd6]">using</span>{" "}
            <span className="text-[#4ec9b0]">System;</span>
          </div>

          <div className="h-7" />

          <div>
            <span className="text-[#569cd6]">class</span>{" "}
            <span className="text-[#4ec9b0]">Program</span>
          </div>

          <div className="text-[#f1d847]">{"{"}</div>

          <div className="ml-4">
            <span className="text-[#569cd6]">static void</span>{" "}
            <span className="text-[#dcdcaa]">Main</span>(
            <span className="text-[#569cd6]">string[]</span>{" "}
            <span className="text-[#9dd2f3]">args</span>)
          </div>

          <div className="ml-4 text-[#ba74e9]">{"{"}</div>

          <div className="ml-8">
            <span className="text-[#9dd2f3]">Console</span>
            <span>.</span>
            <span className="text-[#dcdcaa]">WriteLine</span>
            <span>(</span>
            <span className="text-[#ce9178]">"Hello, World!"</span>
            <span>);</span>

            <span
              className="inline-block w-[2px] h-4 bg-[#aeafad] ml-1 align-middle"
              style={{ opacity: cursorVisible ? 1 : 0 }}
            />
          </div>

          <div className="ml-4 text-[#b65dff]">{"}"}</div>
          <div className="text-[#f1d847]">{"}"}</div>
        </div>
      </div>
    </div>
  );
};

export default CodeWindow;
