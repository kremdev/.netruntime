// hooks/useCodeRunner.ts

import { useState, useRef, useCallback, useEffect, KeyboardEvent } from "react";
import { startRun, pollOutput, sendInput } from "../lib/runCode";
import type { UseCodeRunnerReturn } from "@/types/props";

export const useCodeRunner = (
  code: string,
  hasReadLine: boolean,
): UseCodeRunnerReturn => {
  const [output, setOutput] = useState<string>("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentLine, setCurrentLine] = useState<string>("");
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    if (isRunning && hasReadLine) {
      inputRef.current?.focus();
    }
  }, [isRunning, hasReadLine, output]);

  useEffect(() => {
    if (!sessionId) return;

    const interval = setInterval(async () => {
      try {
        const data = await pollOutput(sessionId);
        if (data.output) {
          setOutput((prev) => prev + data.output);
        }
        if (data.done) {
          setIsRunning(false);
          setSessionId(null);
          clearInterval(interval);
        }
      } catch {
        clearInterval(interval);
        setIsRunning(false);
        setSessionId(null);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [sessionId]);

  const handleRun = useCallback(async () => {
    setOutput("");
    setIsRunning(true);
    setSessionId(null);
    setCurrentLine("");

    const maxAttempts = 3;
    let lastError: unknown = null;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const data = await startRun(code);
        if (data.output) {
          setOutput(data.output);
        }
        if (!data.done) {
          setSessionId(data.sessionId);
        } else {
          setIsRunning(false);
        }
        return;
      } catch (e) {
        lastError = e;
        if (attempt < maxAttempts) {
          const delay = attempt * 300;
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }
      }
    }

    setOutput(
      `❌ Error running code after multiple attempts. Please try again.\n${String(
        lastError,
      )}`,
    );
    setIsRunning(false);
  }, [code]);

  const handleKey = useCallback(
    async (e: KeyboardEvent<HTMLInputElement>) => {
      if (!sessionId || !isRunning) return;

      if (e.key === "Enter") {
        e.preventDefault();
        const value = currentLine;
        setOutput((prev) => prev + value + "\n");
        setCurrentLine("");
        await sendInput(sessionId, value);
      }
    },
    [sessionId, isRunning, currentLine],
  );

  return {
    output,
    setOutput,
    sessionId,
    isRunning,
    currentLine,
    setCurrentLine,
    outputRef,
    inputRef,
    handleRun,
    handleKey,
  };
};
