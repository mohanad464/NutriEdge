/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    
    await connectDB();
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    
    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
