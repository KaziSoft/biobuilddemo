//app/api/clients/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose';
import Client from "@/models/Client";
import cloudinary from '@/lib/cloudinary';
// GET - fetch all locations
// GET - fetch locations with pagination
export async function GET(req: NextRequest) {
  try {
    await connectMongo();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '6');

    const total = await Client.countDocuments();
    const locations = await Client.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({ locations, total });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ message: 'Failed to fetch clients' }, { status: 500 });
  }
}


// Optional: POST - to add location
export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const file = formData.get('image') as File;

    if (!file || !name) {
      return NextResponse.json({ message: 'Name and image are required' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploadRes = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: 'clients' }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }).end(buffer);
    });

    const newClient = new Client({
      name,
      image: uploadRes.secure_url,
    });

    await newClient.save();

    return NextResponse.json({ message: 'Client added successfully' });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ message: 'Failed to add client' }, { status: 500 });
  }
}
