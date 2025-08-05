import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectMongo from '@/lib/mongoose';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  await connectMongo();

  const { email, oldPassword, newPassword } = await req.json();

  if (!email || !oldPassword || !newPassword) {
    return NextResponse.json({ success: false, message: 'All fields are required.' }, { status: 400 });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ success: false, message: 'User not found.' }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return NextResponse.json({ success: false, message: 'Old password is incorrect.' }, { status: 401 });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  return NextResponse.json({ success: true, message: 'Password updated successfully.' });
}
