import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { shows as defaultShows } from '@/content/site';

export async function GET() {
  try {
    const dbShows = await prisma.show.findMany({
      orderBy: [{ date: 'asc' }, { time: 'asc' }],
    });

    if (dbShows && dbShows.length > 0) {
      return NextResponse.json({
        shows: dbShows,
        source: 'database',
      });
    }

    // Fallback resiliente
    return NextResponse.json({
      shows: defaultShows,
      source: 'static_fallback',
    });
  } catch {
    return NextResponse.json({
      shows: defaultShows,
      source: 'static_fallback',
    });
  }
}

