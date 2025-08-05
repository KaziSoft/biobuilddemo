import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose'; // Ensure you have dbConnect for connecting to MongoDB
import NewsEvent from '@/models/NewsEvent';

export async function GET() {
    await connectMongo(); // Connect to MongoDB

    try {
        const totalNewsEvents = await NewsEvent.countDocuments();
        return NextResponse.json({ total: totalNewsEvents });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching total NewsEvents' }, { status: 500 });
    }
}
