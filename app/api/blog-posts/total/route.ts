import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose'; // Ensure you have dbConnect for connecting to MongoDB
import BlogPost from '@/models/BlogPost';

export async function GET() {
    await connectMongo(); // Connect to MongoDB

    try {
        const totalBlogPosts = await BlogPost.countDocuments();
        return NextResponse.json({ total: totalBlogPosts });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching total products' }, { status: 500 });
    }
}
