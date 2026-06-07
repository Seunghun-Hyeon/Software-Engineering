import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const serverUrl =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      'https://handong-club-hub-backend.onrender.com/api';
    const response = await fetch(`${serverUrl}/clubs`);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch clubs: ${response.statusText}` },
        { status: response.status }
      );
    }

    const clubs = await response.json();
    return NextResponse.json(clubs);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
