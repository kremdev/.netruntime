import { NextResponse } from "next/server";
import { writeFile, rm, mkdir } from "fs/promises";
import { join } from "path";
import { spawn } from "child_process";
import { randomUUID } from "crypto";
import csproj from "@/cs/csproj";
import { sessions, startSessionCleanup } from "../../lib/sessions";
import type { Session } from "@/types/session";

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    startSessionCleanup();

    const shardId = randomUUID();
    const shardPath = join(process.cwd(), ".netexec", shardId);

    await mkdir(shardPath, { recursive: true });
    await writeFile(join(shardPath, "Shard.csproj"), csproj);
    await writeFile(join(shardPath, "Program.cs"), code);

    const child = spawn("dotnet", ["run"], { cwd: shardPath });

    const id = randomUUID();
    const session: Session = {
      child,
      shardPath,
      output: "",
      done: false,
      lastInputAt: Date.now(),
      lastSent: 0,
      waitingForInput: false,
    };

    sessions.set(id, session);

    child.stdout.on("data", (data) => {
      session.output += data.toString();
      session.lastInputAt = Date.now();
    });

    child.stderr.on("data", (data) => {
      session.output += data.toString();
      session.lastInputAt = Date.now();
    });

    child.on("close", async () => {
      session.done = true;
      await rm(shardPath, { recursive: true, force: true });
    });

    await new Promise((resolve) => setTimeout(resolve, 150));

    return NextResponse.json({
      sessionId: id,
      output: session.output,
      done: session.done,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Server Error", details: String(e) },
      { status: 500 },
    );
  }
}
