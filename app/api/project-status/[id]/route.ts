import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose';
import ProjectStatus from '@/models/ProjectStatus';

export async function GET(_: NextRequest, { params }: { params: any }) {
  await connectMongo();
  try {
    const project = await ProjectStatus.findById(params.id);
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(project);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: any }) {
  await connectMongo();
  try {
    const body = await req.json();
    const updated = await ProjectStatus.findByIdAndUpdate(params.id, body, { new: true });
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: any }) {
  await connectMongo();
  try {
    const deleted = await ProjectStatus.findByIdAndDelete(params.id);
    if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
