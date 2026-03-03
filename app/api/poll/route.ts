import { NextResponse } from "next/server";
import { sessions } from "../../lib/sessions";

export async function POST(request: Request) {
  const { sessionId } = await request.json();
  const session = sessions.get(sessionId);

  if (!session)
    return NextResponse.json({ error: "Session not found" }, { status: 404 });

  const newOutput = session.output.slice(session.lastSent);
  session.lastSent = session.output.length;

  if (session.done && session.lastSent >= session.output.length) {
    sessions.delete(sessionId);
  }

  return NextResponse.json({ output: newOutput, done: session.done });
}
