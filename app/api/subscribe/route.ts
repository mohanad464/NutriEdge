import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Use "Gmail" or configure SMTP settings
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    // Email options
    await transporter.sendMail({
      from: `"NutriEdge" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to NutriEdge!",
      text: "Thank you for choosing NutriEdge! 😊",
    });

    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
