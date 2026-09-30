import { NextResponse } from 'next/server';

const GNEWS_API_KEY = process.env.GNEWS_API_KEY;
const GNEWS_API_URL = 'https://gnews.io/api/v4/search';

export async function GET(request: Request) {
  try {
    if (!GNEWS_API_KEY) {
      return NextResponse.json(
        { error: 'GNews API key is not configured' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || 'solar panel';
    const max = searchParams.get('max') || '10';

    const url = new URL(GNEWS_API_URL);
    url.searchParams.append('q', query);
    url.searchParams.append('lang', 'en');
    url.searchParams.append('sortby', 'publishedAt');
    url.searchParams.append('max', max);
    url.searchParams.append('apikey', GNEWS_API_KEY);

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.errors || 'Failed to fetch news from GNews API' },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in /api/solar-news:', error);
    return NextResponse.json(
      { error: 'Internal server error while fetching news' },
      { status: 500 }
    );
  }
}
