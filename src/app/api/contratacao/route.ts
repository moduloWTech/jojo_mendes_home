import { NextRequest, NextResponse } from 'next/server';
import { bookingFormSchema } from '@/lib/validation/booking';
import { sendBookingInquiry } from '@/lib/booking/sendBookingInquiry';

const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const ipRequestTimestamps = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRequestTimestamps.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    ipRequestTimestamps.set(ip, recent);
    return true;
  }
  recent.push(now);
  ipRequestTimestamps.set(ip, recent);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const contentLength = Number(request.headers.get('content-length') ?? '0');
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { code: 'PAYLOAD_TOO_LARGE' },
        { status: 413 }
      );
    }

    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'local-client';

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { code: 'RATE_LIMITED' },
        { status: 429 }
      );
    }

    const rawText = await request.text();
    if (rawText.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { code: 'PAYLOAD_TOO_LARGE' },
        { status: 413 }
      );
    }

    let body: unknown;
    try {
      body = JSON.parse(rawText);
    } catch {
      return NextResponse.json({ code: 'INVALID_JSON' }, { status: 400 });
    }

    const parsed = bookingFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          code: 'VALIDATION_ERROR',
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Se o honeypot foi preenchido por um bot, rejeitar silenciosamente sem expor detalhes
    if (parsed.data.websiteHoneypot && parsed.data.websiteHoneypot.trim() !== '') {
      return NextResponse.json({ code: 'SPAM_REJECTED' }, { status: 400 });
    }

    const delivery = await sendBookingInquiry(parsed.data);

    if (delivery.status === 'not_configured') {
      return NextResponse.json(
        { code: 'NOT_CONFIGURED' },
        { status: 503 }
      );
    }

    if (delivery.status === 'error') {
      return NextResponse.json(
        { code: 'DELIVERY_FAILED' },
        { status: 502 }
      );
    }

    return NextResponse.json({ code: 'SENT' }, { status: 201 });
  } catch {
    return NextResponse.json(
      { code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}

