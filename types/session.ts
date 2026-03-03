import { ChildProcessWithoutNullStreams } from "child_process";

export type Session = {
  child: ChildProcessWithoutNullStreams;
  shardPath: string;
  output: string;
  lastSent: number;
  waitingForInput: boolean;
  done: boolean;
  lastInputAt: number;
};

export type SessionsGlobals = {
  __netruntimeSessions?: Map<string, Session>;
  __netruntimeCleanupInterval?: ReturnType<typeof setInterval>;
};
