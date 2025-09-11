import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import rateLimit from 'express-rate-limit';

/**
 * Waitlist API endpoint with validation, anti-spam, and double opt-in flow
 * AICODE-NOTE: Implements comprehensive form handling according to specifications
 */

// Validation schema
const waitlistSchema = z.object({
  email: z.string().email('Invalid email format'),
  honeypot: z.string().optional(), // Anti-spam honeypot field
  timestamp: z.number().optional(), // For timing-based spam detection
});

// Simple in-memory rate limiting (in production, use Redis)
const ipRequests = new Map<string, { count: number; resetTime: number }>();

/**
 * Rate limiting function
 * AICODE-TODO: Replace with Redis-based solution for production
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // Max 5 requests per 15 minutes

  const record = ipRequests.get(ip);
  
  if (!record || now > record.resetTime) {
    ipRequests.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  return true;
}

/**
 * Generate confirmation token
 * AICODE-TODO: Use proper JWT or crypto-secure token generation
 */
function generateConfirmationToken(email: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  return Buffer.from(`${email}:${timestamp}:${randomString}`).toString('base64');
}

/**
 * Send confirmation email
 * AICODE-TODO: Integrate with actual email service (SendGrid, Resend, etc.)
 */
async function sendConfirmationEmail(email: string, token: string): Promise<boolean> {
  try {
    // Simulate email sending
    console.log(`Sending confirmation email to ${email} with token ${token}`);
    
    // In production, integrate with email service:
    // const confirmationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/waitlist/confirm?token=${token}`;
    // await emailService.send({
    //   to: email,
    //   subject: 'Подтвердите подписку на Character Saga',
    //   html: `<p>Кликните <a href="${confirmationUrl}">здесь</a> для подтверждения</p>`
    // });
    
    return true;
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    return false;
  }
}

/**
 * Store waitlist entry
 * AICODE-TODO: Replace with actual database integration
 */
async function storeWaitlistEntry(email: string, persona?: string, confirmed: boolean = false): Promise<boolean> {
  try {
    // Simulate database storage
    console.log(`Storing waitlist entry: ${email}, persona: ${persona}, confirmed: ${confirmed}`);
    
    // In production, use database:
    // await db.waitlist.create({
    //   data: {
    //     email,
    //     persona,
    //     confirmed,
    //     createdAt: new Date(),
    //   }
    // });
    
    return true;
  } catch (error) {
    console.error('Failed to store waitlist entry:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    
    // Validate input
    const validationResult = waitlistSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationResult.error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      );
    }

    const { email, honeypot, timestamp } = validationResult.data;

    // Anti-spam checks
    
    // 1. Honeypot check
    if (honeypot && honeypot.trim() !== '') {
      console.log(`Spam detected via honeypot for IP: ${ip}`);
      // Return success to not reveal spam detection
      return NextResponse.json({ success: true, message: 'Please check your email for confirmation.' });
    }

    // 2. Timing check (form filled too quickly)
    if (timestamp) {
      const formFillTime = Date.now() - timestamp;
      if (formFillTime < 3000) { // Less than 3 seconds
        console.log(`Spam detected via timing for IP: ${ip}, fill time: ${formFillTime}ms`);
        // Return success to not reveal spam detection
        return NextResponse.json({ success: true, message: 'Please check your email for confirmation.' });
      }
    }

    // 3. Basic email domain validation
    const emailDomain = email.split('@')[1];
    const suspiciousDomains = ['tempmail.org', '10minutemail.com', 'guerrillamail.com'];
    if (suspiciousDomains.includes(emailDomain)) {
      return NextResponse.json(
        { error: 'Please use a valid email address.' },
        { status: 400 }
      );
    }

    // Check if email already exists
    // AICODE-TODO: Implement actual database check
    // const existingEntry = await db.waitlist.findUnique({ where: { email } });
    // if (existingEntry) {
    //   if (existingEntry.confirmed) {
    //     return NextResponse.json(
    //       { error: 'This email is already registered.' },
    //       { status: 409 }
    //     );
    //   } else {
    //     // Resend confirmation
    //     const token = generateConfirmationToken(email);
    //     await sendConfirmationEmail(email, token);
    //     return NextResponse.json({ 
    //       success: true, 
    //       message: 'Confirmation email resent. Please check your inbox.' 
    //     });
    //   }
    // }

    // Generate confirmation token
    const confirmationToken = generateConfirmationToken(email);

    // Store unconfirmed entry
    const stored = await storeWaitlistEntry(email, persona, false);
    if (!stored) {
      return NextResponse.json(
        { error: 'Failed to process registration. Please try again.' },
        { status: 500 }
      );
    }

    // Send confirmation email
    const emailSent = await sendConfirmationEmail(email, confirmationToken);
    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send confirmation email. Please try again.' },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Please check your email for confirmation.'
    });

  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}