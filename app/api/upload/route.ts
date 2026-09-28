import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    console.log("Starting upload process...");
    
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error("Missing BLOB_READ_WRITE_TOKEN");
      return NextResponse.json({ error: "Server missing blob token" }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    console.log("File received:", file?.name);

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const filename = file.name;

    console.log("Uploading to vercel blob...");
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: false, // Keeps the original file name
      token: process.env.BLOB_READ_WRITE_TOKEN, // explicitly pass token
    });
    console.log("Upload successful:", blob.url);

    return NextResponse.json({
      url: blob.url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
