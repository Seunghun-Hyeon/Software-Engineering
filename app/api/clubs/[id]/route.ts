import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const serverUrl =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      'https://handong-club-hub-backend.onrender.com/api';

    const response = await fetch(`${serverUrl}/clubs/${id}`);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch club: ${response.statusText}` },
        { status: response.status }
      );
    }

    const club = await response.json();
    return NextResponse.json(club);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
