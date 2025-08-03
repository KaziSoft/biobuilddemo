//app/api/blog-posts/route.ts

import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose';
import BlogPost from '@/models/BlogPost';

export async function GET() {
  await connectMongo();
  const posts = await BlogPost.find().sort({ createdAt: -1 });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const data = await req.json();
    const newPost = await BlogPost.create(data);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ message: 'Failed to create post' }, { status: 500 });
  }
}