import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { gallery as defaultGallery } from '@/content/site';

const MAX_GALLERY_PHOTOS = 8;

export async function GET() {
  try {
    const dbPhotos = await prisma.galleryImage.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      take: MAX_GALLERY_PHOTOS,
    });

    if (dbPhotos && dbPhotos.length > 0) {
      return NextResponse.json({
        photos: dbPhotos,
        source: 'database',
      });
    }

    return NextResponse.json({
      photos: defaultGallery.slice(0, MAX_GALLERY_PHOTOS),
      source: 'static_fallback',
    });
  } catch {
    return NextResponse.json({
      photos: defaultGallery.slice(0, MAX_GALLERY_PHOTOS),
      source: 'static_fallback',
    });
  }
}

