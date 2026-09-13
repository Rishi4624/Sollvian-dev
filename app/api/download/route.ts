import { NextResponse } from 'next/server';

/* ─── GET /api/download ──────────────────────────────────── */
/* Server-side redirect to the download URL stored in env.    */
/* The real URL is never exposed in the browser JS bundle.    */

export async function GET() {
  const url = process.env.DOWNLOAD_URL;

  if (!url) {
    return new NextResponse('Download not configured', { status: 503 });
  }

  return NextResponse.redirect(url, { status: 302 });
}
