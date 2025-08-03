//app/api/prime-locations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose';
import { PrimeLocation } from '@/models/PrimeLocation';

// GET - fetch all locations
// GET - fetch locations with pagination
export async function GET(req: NextRequest) {
  try {
    await connectMongo();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '6');

    const total = await PrimeLocation.countDocuments();
    const locations = await PrimeLocation.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({ locations, total });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ message: 'Failed to fetch locations' }, { status: 500 });
  }
}


// Optional: POST - to add location
export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const { name, description, image } = await req.json();
    const newLocation = new PrimeLocation({ name, description, image });
    await newLocation.save();
    return NextResponse.json({ message: 'Location added successfully' });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ message: 'Failed to add location' }, { status: 500 });
  }
}
