import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const serverUrl =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      'https://handong-club-hub-backend.onrender.com/api';
    const response = await fetch(`${serverUrl}/categories`);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch categories: ${response.statusText}` },
        { status: response.status }
      );
    }

    const categories = await response.json();
    return NextResponse.json(categories);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
