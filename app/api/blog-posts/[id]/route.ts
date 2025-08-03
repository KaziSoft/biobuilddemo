import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose';
import BlogPost from '@/models/BlogPost';

export async function GET(_: NextRequest, { params }: { params: any }) {
  await connectMongo();
  const post = await BlogPost.findById(params.id);
  if (!post) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: { params: any }) {
  try {
    await connectMongo();
    const data = await req.json();
    const updatedPost = await BlogPost.findByIdAndUpdate(params.id, data, { new: true });
    if (!updatedPost) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ message: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: any }) {
  try {
    await connectMongo();
    const deleted = await BlogPost.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ message: 'Failed to delete post' }, { status: 500 });
  }
}
