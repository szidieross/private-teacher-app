import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/libs/mysql";
import { createUser } from "../../services/user.service";
import { join } from "path";
import { writeFile } from "fs/promises";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join("/", "tmp", file.name);
  await writeFile(path, buffer);
  console.log("open ", path);

  return NextResponse.json({ success: true });
}
