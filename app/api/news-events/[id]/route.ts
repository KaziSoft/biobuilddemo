// app/api/news-events/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose';
import NewsEvent from '@/models/NewsEvent';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();

    const item = await NewsEvent.findById(params.id).lean();

    if (!item) {
      return NextResponse.json(
        { message: 'News/Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error fetching news/event:', error);
    return NextResponse.json(
      { message: 'Error fetching news/event' },
      { status: 500 }
    );
  }
}
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const { id } = params;
    const body = await req.json();

    const updated = await NewsEvent.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error('Error updating news/event:', error);
    return NextResponse.json({ message: 'Failed to update item' }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const { id } = params;

    const deleted = await NewsEvent.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting news/event:', error);
    return NextResponse.json({ message: 'Failed to delete item' }, { status: 500 });
  }
}