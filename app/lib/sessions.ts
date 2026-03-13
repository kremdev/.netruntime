import type { Session } from "@/types/session";

const TEN_MINUTES_MS = 10 * 60 * 1000;
const CLEANUP_INTERVAL_MS = 60 * 1000;

const g = globalThis as any;
g.sessions ??= new Map<string, Session>();
g.cleanupInterval ??= null;

export const sessions: Map<string, Session> = g.sessions;

export function startSessionCleanup() {
  if (g.cleanupInterval) return;

  g.cleanupInterval = setInterval(() => {
    const now = Date.now();

    for (const [id, session] of sessions) {
      if (now - session.lastInputAt < TEN_MINUTES_MS) continue;

      if (session.child.exitCode == null) {
        try {
          session.child.kill();
        } catch (e) { console.error(e) };
      }

      sessions.delete(id);
    }
  }, CLEANUP_INTERVAL_MS);
}
