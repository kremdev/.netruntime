// types/props.ts

import {
  RefObject,
  Dispatch,
  SetStateAction,
  KeyboardEvent,
  MouseEvent,
} from "react";

export interface EditorScreenProps {
  splitPos: number;
  code: string;
  setCode: (code: string) => void;
  isRunning: boolean;
  handleRun: () => void;
}

export interface TabBarProps {
  isRunning: boolean;
  handleRun: () => void;
}

export interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
}

export interface TerminalScreenProps {
  isRunning: boolean;
  hasReadLine: boolean;
  output: string;
  setOutput: Dispatch<SetStateAction<string>>;
  outputRef: RefObject<HTMLDivElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
  currentLine: string;
  setCurrentLine: Dispatch<SetStateAction<string>>;
  handleKey: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export interface TerminalHeaderProps {
  isRunning: boolean;
  hasReadLine: boolean;
  onClear: () => void;
}

export interface TerminalBodyProps {
  output: string;
  hasReadLine: boolean;
  isRunning: boolean;
  outputRef: RefObject<HTMLDivElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
  currentLine: string;
  setCurrentLine: Dispatch<SetStateAction<string>>;
  handleKey: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export interface TerminalInputProps {
  inputRef: RefObject<HTMLInputElement | null>;
  currentLine: string;
  setCurrentLine: Dispatch<SetStateAction<string>>;
  handleKey: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export interface TerminalStatusProps {
  isRunning: boolean;
  hasReadLine: boolean;
}

export interface ResizerProps {
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export interface UseCodeRunnerReturn {
  output: string;
  setOutput: Dispatch<SetStateAction<string>>;
  sessionId: string | null;
  isRunning: boolean;
  currentLine: string;
  setCurrentLine: Dispatch<SetStateAction<string>>;
  outputRef: RefObject<HTMLDivElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
  handleRun: () => void;
  handleKey: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export interface UseThemeReturn {
  defineVSCodeTheme: () => void;
}

export interface UseSplitResizeReturn {
  splitPos: number;
  onMouseDown: (e: MouseEvent<HTMLDivElement>) => void;
}

export interface UseKeyboardShortcutsProps {
  handleRun: () => void;
}
