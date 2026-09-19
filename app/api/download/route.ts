import { NextResponse } from 'next/server';

/* ─── GET /api/download ──────────────────────────────────── */
/* Simple redirect to the .exe file stored in Vercel Blob.   */
/* Set DOWNLOAD_URL in .env.local to your Blob public URL.   */

export async function GET() {
  const url = process.env.DOWNLOAD_URL;

  if (!url) {
    return new NextResponse('Download not configured. Set DOWNLOAD_URL in .env.local', {
      status: 503,
    });
  }

  return NextResponse.redirect(url, {
    status: 302,
    headers: { 'Cache-Control': 'no-store' },
  });
}
