import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose';
import { Project } from '@/models/Project'; // adjust the path if needed

// Get all projects
export async function GET() {
  try {
    await connectMongo();
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching projects', error }, { status: 500 });
  }
}

// Create new project
export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const body = await req.json();
    const newProject = await Project.create(body);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating project', error }, { status: 500 });
  }
}
