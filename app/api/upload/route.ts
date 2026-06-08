import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const isVideo = file.type.startsWith('video/');

    // Set a limit for video size up to 100MB
    const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100 MB
    if (isVideo && file.size > MAX_VIDEO_SIZE) {
      return NextResponse.json(
        { error: 'Video size must be less than 100MB' },
        { status: 413 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;

    // Ensure upload directory exists
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch {}

    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    const url = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url,
      type: isVideo ? 'video' : 'photo',
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
