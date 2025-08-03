import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose';
import { PrimeLocation } from '@/models/PrimeLocation';

export async function PATCH(req: NextRequest, { params }: { params: any }) {
  try {
    await connectMongo();
    const body = await req.json();
    const updated = await PrimeLocation.findByIdAndUpdate(params.id, body, { new: true });

    if (!updated) return NextResponse.json({ message: 'Location not found' }, { status: 404 });
    return NextResponse.json({ message: 'Location updated', location: updated });
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json({ message: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: any }) {
  try {
    await connectMongo();
    const deleted = await PrimeLocation.findByIdAndDelete(params.id);
    if (!deleted) return NextResponse.json({ message: 'Location not found' }, { status: 404 });
    return NextResponse.json({ message: 'Location deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ message: 'Delete failed' }, { status: 500 });
  }
}
