import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

/**
 * Email confirmation endpoint for double opt-in flow
 * AICODE-NOTE: Handles email confirmation tokens and updates user status
 */

/**
 * Verify confirmation token
 * AICODE-TODO: Implement proper token verification with expiration
 */
function verifyConfirmationToken(token: string): { valid: boolean; email?: string; expired?: boolean } {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [email, timestamp, randomString] = decoded.split(':');
    
    if (!email || !timestamp || !randomString) {
      return { valid: false };
    }
    
    // Check if token is expired (24 hours)
    const tokenAge = Date.now() - parseInt(timestamp);
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    if (tokenAge > maxAge) {
      return { valid: false, expired: true, email };
    }
    
    return { valid: true, email };
  } catch (error) {
    console.error('Token verification error:', error);
    return { valid: false };
  }
}

/**
 * Update waitlist entry to confirmed status
 * AICODE-TODO: Replace with actual database integration
 */
async function confirmWaitlistEntry(email: string): Promise<boolean> {
  try {
    // Simulate database update
    console.log(`Confirming waitlist entry for: ${email}`);
    
    // In production, use database:
    // await db.waitlist.update({
    //   where: { email },
    //   data: { 
    //     confirmed: true,
    //     confirmedAt: new Date()
    //   }
    // });
    
    return true;
  } catch (error) {
    console.error('Failed to confirm waitlist entry:', error);
    return false;
  }
}

/**
 * Send welcome email after confirmation
 * AICODE-TODO: Integrate with actual email service
 */
async function sendWelcomeEmail(email: string): Promise<boolean> {
  try {
    // Simulate welcome email
    console.log(`Sending welcome email to: ${email}`);
    
    // In production, integrate with email service:
    // await emailService.send({
    //   to: email,
    //   subject: 'Добро пожаловать в Character Saga!',
    //   html: welcomeEmailTemplate
    // });
    
    return true;
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return false;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    if (!token) {
      // Redirect to error page
      return redirect('/waitlist?error=invalid_token');
    }
    
    // Verify token
    const verification = verifyConfirmationToken(token);
    
    if (!verification.valid) {
      if (verification.expired) {
        // Redirect to expired token page
        return redirect('/waitlist?error=token_expired');
      }
      // Redirect to invalid token page
      return redirect('/waitlist?error=invalid_token');
    }
    
    const { email } = verification;
    
    if (!email) {
      return redirect('/waitlist?error=invalid_token');
    }
    
    // Check if already confirmed
    // AICODE-TODO: Implement actual database check
    // const existingEntry = await db.waitlist.findUnique({ where: { email } });
    // if (existingEntry?.confirmed) {
    //   return redirect('/waitlist?status=already_confirmed');
    // }
    
    // Confirm the entry
    const confirmed = await confirmWaitlistEntry(email);
    
    if (!confirmed) {
      return redirect('/waitlist?error=confirmation_failed');
    }
    
    // Send welcome email
    await sendWelcomeEmail(email);
    
    // Redirect to success page
    return redirect('/waitlist?status=confirmed');
    
  } catch (error) {
    console.error('Confirmation error:', error);
    return redirect('/waitlist?error=server_error');
  }
}

// Handle other HTTP methods
export async function POST() {
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