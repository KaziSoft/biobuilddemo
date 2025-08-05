import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose'; // Ensure you have dbConnect for connecting to MongoDB
import { Project } from '@/models/Project';

export async function GET() {
    await connectMongo(); // Connect to MongoDB

    try {
        const totalProjects = await Project.countDocuments();
        return NextResponse.json({ total: totalProjects });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching total products' }, { status: 500 });
    }
}
