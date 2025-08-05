import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose'; // Assume you have a DB connection utility
import { Project } from '@/models/Project';  // Your Product model

export async function GET() {
    try {
        await connectMongo();  // Ensure you connect to the database

        // Aggregate products by category and count
        const statusCounts = await Project.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        return NextResponse.json({ success: true, data: statusCounts });
    } catch (error) {
        console.error('Error fetching category counts:', error);
        return NextResponse.json({ success: false, message: 'Error fetching category counts' });
    }
}
