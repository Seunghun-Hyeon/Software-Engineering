import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const body = await request.json();
    const { club_id, answers } = body;

    if (!club_id) {
      return NextResponse.json(
        { error: 'Club ID is required' },
        { status: 400 }
      );
    }

    // Retrieve active session user_id
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized user session' },
        { status: 401 }
      );
    }

    // TODO: Replace this database call with actual database calls (e.g., Prisma or Drizzle query to PostgreSQL)
    const { data, error } = await supabase
      .from('applications')
      .insert({
        user_id: user.id,
        club_id: club_id,
        answers: answers,
        status: 'Pending',
        submitted_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('Failed to submit application via API:', err);
    return NextResponse.json(
      { error: 'Failed to process application' },
      { status: 500 }
    );
  }
}
