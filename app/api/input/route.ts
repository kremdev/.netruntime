import { NextResponse } from "next/server";
import { sessions } from "../../lib/sessions";

export async function POST(request: Request) {
  const { sessionId, input } = await request.json();
  const session = sessions.get(sessionId);

  if (!session)
    return NextResponse.json({ error: "Session not found" }, { status: 404 });

  session.lastInputAt = Date.now();
  session.child.stdin.write(input + "\n");

  return NextResponse.json({ ok: true });
}
