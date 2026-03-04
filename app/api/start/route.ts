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

    const id = randomUUID();

    const session: Session = {
      child: null as any,
      shardPath,
      output: "",
      done: false,
      lastInputAt: Date.now(),
      lastSent: 0,
      waitingForInput: false,
    };

    sessions.set(id, session);

    const build = spawn("dotnet", ["build", "--no-restore"], {
      cwd: shardPath,
      stdio: ["pipe", "pipe", "pipe"],
    });
    
    build.stdout.on("data", (data) => {
      session.output += data.toString();
    });

    build.stderr.on("data", (data) => {
      session.output += data.toString();
    });

    build.on("close", (code) => {
      if (code !== 0) {
        session.output += "\nBuild failed.";
        session.done = true;
        return;
      }

      const dllPath = join(shardPath, "bin", "Debug", "net8.0", "Shard.dll");

      const child = spawn("dotnet", [dllPath], {
        stdio: ["pipe", "pipe", "pipe"],
      });

      session.child = child;

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

      setTimeout(() => {
        if (!session.done) {
          child.kill("SIGKILL");
          session.output += "\nProcess timed out.";
          session.done = true;
        }
      }, 5000);
    });

    return NextResponse.json({
      sessionId: id,
      output: "",
      done: false,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Server Error", details: String(e) },
      { status: 500 },
    );
  }
}
