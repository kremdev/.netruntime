import type { Session } from "@/types/session";

const TEN_MINUTES_MS = 40 * 1000; // 5 دقائق
const CLEANUP_INTERVAL_MS = 20 * 1000; // كل دقيقة

// تخزين الجلسات بشكل عالمي
const g = globalThis as any;
g.sessions ??= new Map<string, Session>();
g.cleanupInterval ??= null;

export const sessions: Map<string, Session> = g.sessions;

// تنظيف الجلسات القديمة
export function startSessionCleanup() {
  if (g.cleanupInterval) return; // لا نشغل أكثر من مرة

  g.cleanupInterval = setInterval(() => {
    const now = Date.now();

    for (const [id, session] of sessions) {
      if (session.done) continue;
      if (now - session.lastInputAt < TEN_MINUTES_MS) {
        console.log(false);
        continue;
      }
      console.log(true);
      session.child.kill(); // إيقاف الكود
      sessions.delete(id); // حذف الجلسة
    }
  }, CLEANUP_INTERVAL_MS);
}
