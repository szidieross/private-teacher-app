import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { writeFile } from "fs/promises";
import { createReadStream, createWriteStream } from "fs";
import { updateUserImage } from "../../services/user.service";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const publicFolderPath = join(process.cwd(), "public/images/uploads", file.name);

  const writeStream = createWriteStream(publicFolderPath);
  writeStream.write(buffer);
  writeStream.end();

  try {
    updateUserImage(file.name)
  } catch (error) {
    console.error("error")
  }

  return NextResponse.json({ success: true });
}
