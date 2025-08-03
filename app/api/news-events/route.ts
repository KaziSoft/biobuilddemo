//app/api/news-events/route.ts
import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose';
import NewsEvent from '@/models/NewsEvent';

export async function GET(request: Request) {
  try {
    await connectMongo();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '6');

    const skip = (page - 1) * limit;

    // Fetch news and events with pagination
    const items = await NewsEvent.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await NewsEvent.countDocuments();

    return NextResponse.json({
      data: items,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching news and events:', error);
    return NextResponse.json(
      { message: 'Error fetching news and events' },
      { status: 500 }
    );
  }
}
