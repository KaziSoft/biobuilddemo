import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose';
import { Project } from '@/models/Project';

export async function GET(req: NextRequest) {
  try {
    await connectMongo();
    
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    if (!status || !['ongoing', 'completed', 'upcoming'].includes(status)) {
      return NextResponse.json({ error: 'Invalid or missing status' }, { status: 400 });
    }

    const projects = await Project.find({ status });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
