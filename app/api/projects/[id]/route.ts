import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose';
import { Project } from '@/models/Project';

export async function GET(_: NextRequest, { params }: { params: any }) {
  try {
    await connectMongo();
    const project = await Project.findById(params.id);
    if (!project) return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    return NextResponse.json(project);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ message: 'Error fetching project' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: any }) {
  try {
    await connectMongo();
    const updates = await req.json();
    const updatedProject = await Project.findByIdAndUpdate(params.id, updates, { new: true });
    if (!updatedProject) return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json({ message: 'Error updating project' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: any }) {
  try {
    await connectMongo();
    const deleted = await Project.findByIdAndDelete(params.id);
    if (!deleted) return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ message: 'Error deleting project' }, { status: 500 });
  }
}
