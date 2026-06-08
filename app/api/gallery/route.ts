import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const dataFilePath = join(process.cwd(), 'data', 'gallery.json');

// TODO: Replace this file read with actual database calls (e.g., Prisma or Drizzle query to PostgreSQL)
export async function GET() {
  try {
    const fileContents = await readFile(dataFilePath, 'utf8');
    const gallery = JSON.parse(fileContents);
    return NextResponse.json(gallery);
  } catch {
    // If file doesn't exist or is invalid, return empty array
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const newItem = await request.json();

    // Read existing
    let gallery = [];
    try {
      const fileContents = await readFile(dataFilePath, 'utf8');
      gallery = JSON.parse(fileContents);
    } catch {}

    newItem.id = Date.now().toString();
    gallery.unshift(newItem); // add to top

    await writeFile(dataFilePath, JSON.stringify(gallery, null, 2));
    return NextResponse.json(newItem);
  } catch {
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    let gallery = [];
    try {
      const fileContents = await readFile(dataFilePath, 'utf8');
      gallery = JSON.parse(fileContents);
    } catch {}

    gallery = gallery.filter((item: { id: string }) => item.id !== id);

    await writeFile(dataFilePath, JSON.stringify(gallery, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete item' },
      { status: 500 }
    );
  }
}
