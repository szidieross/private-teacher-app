import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { writeFile } from "fs/promises";
import { createReadStream, createWriteStream } from "fs";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const publicFolderPath = join(process.cwd(), "public/images", file.name);

  const writeStream = createWriteStream(publicFolderPath);
  writeStream.write(buffer);
  writeStream.end();

  console.log("File saved to public folder:", publicFolderPath);

  return NextResponse.json({ success: true });
}
