import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  // TODO: Replace this file read with actual database calls (e.g., Prisma or Drizzle query to PostgreSQL)
  const filePath = path.join(process.cwd(), 'data', 'clubs.json');
  const fileData = await fs.readFile(filePath, 'utf8');
  const CLUBS = JSON.parse(fileData);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return NextResponse.json(CLUBS);
}
