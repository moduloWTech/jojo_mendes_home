import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { videos as defaultVideos } from '@/content/site';

export async function GET() {
  try {
    const dbVideos = await prisma.video.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    if (dbVideos && dbVideos.length > 0) {
      return NextResponse.json({
        videos: dbVideos,
        source: 'database',
      });
    }

    return NextResponse.json({
      videos: defaultVideos,
      source: 'static_fallback',
    });
  } catch {
    return NextResponse.json({
      videos: defaultVideos,
      source: 'static_fallback',
    });
  }
}

