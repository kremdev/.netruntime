import { NextResponse } from "next/server";
import { sessions } from "../../lib/sessions";

export async function POST(request: Request) {
  const { sessionId } = await request.json();
  const session = sessions.get(sessionId);

  if (!session)
    return NextResponse.json({ error: "Session not found" }, { status: 404 });

  // أي طلب polling نعتبره نشاط، حتى لو ما فيه مخرجات جديدة
  session.lastInputAt = Date.now();

  const newOutput = session.output.slice(session.lastSent);
  session.lastSent = session.output.length;

  const response = NextResponse.json({
    output: newOutput,
    done: session.done,
  });

  // إذا العملية منتهية والفرونت استلم كل المخرجات، نحذف الجلسة
  if (session.done && session.lastSent >= session.output.length) {
    sessions.delete(sessionId);
  }

  return response;
}
