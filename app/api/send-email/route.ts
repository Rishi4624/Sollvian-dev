import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, companyName, contactNumber, topic, address, message } = body;

    // Validate required fields
    if (!fullName || !email || !topic || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Construct email body
    const emailBody = `New Contact Form Submission

Full Name:
${fullName}

Business Email:
${email}

Company Name:
${companyName || 'Not provided'}

Contact Number:
${contactNumber || 'Not provided'}

Topic:
${topic}

Address:
${address || 'Not provided'}

What are you trying to ship?
${message}

--------------------------------
Reply directly to:
${email}
`;

    // Send the email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `New Contact Request - ${companyName || fullName}`,
      text: emailBody,
    });

    return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
