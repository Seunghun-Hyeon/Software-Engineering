import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const serverUrl =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      'https://handong-club-hub-backend.onrender.com/api';

    const formData = await request.formData();

    // Forward the authorization header if present
    const authHeader = request.headers.get('authorization');
    console.log(
      '[NextJS Proxy] Received authHeader:',
      authHeader ? 'YES' : 'NO'
    );
    const headers: Record<string, string> = {};
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    // Forward the formData directly to the backend.
    // fetch will automatically set the Content-Type to multipart/form-data with the correct boundary.
    const response = await fetch(`${serverUrl}/clubs/register`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error:
            errorData.error ||
            errorData.message ||
            `Failed to register club: ${response.statusText}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
