import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: events, error } = await supabase.from('events').select('*');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(events);
}
