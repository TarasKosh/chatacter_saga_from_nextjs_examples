"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CheckCircle, ChevronDown, BookOpen, MessageCircle, Volume2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

/**
 * Waitlist page component for collecting user signups
 * AICODE-NOTE: Redesigned according to new architecture specifications
 */
export default function WaitlistPage() {
  const [email, setEmail] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [formStartTime, setFormStartTime] = useState<number>(0);
  const searchParams = useSearchParams();

  // Initialize form start time for spam detection
  useEffect(() => {
    setFormStartTime(Date.now());
    
    // Handle URL parameters for confirmation status
    const status = searchParams.get('status');
    const errorParam = searchParams.get('error');
    
    if (status === 'confirmed') {
      setError("");
      // Show success message for confirmed email
    } else if (status === 'already_confirmed') {
      setError("This email is already confirmed.");
    } else if (errorParam) {
      switch (errorParam) {
        case 'invalid_token':
          setError("Invalid confirmation link.");
          break;
        case 'token_expired':
          setError("Confirmation link has expired. Please try registering again.");
          break;
        case 'confirmation_failed':
          setError("Failed to confirm email. Please try again.");
          break;
        case 'server_error':
          setError("A server error occurred. Please try later.");
          break;
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email) {
      setError("Email is required");
      return;
    }
    


    setIsLoading(true);
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          honeypot, // Anti-spam honeypot field
          timestamp: formStartTime, // For timing-based spam detection
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (data.details) {
          // Validation errors
          const errorMessages = (data.details as { message: string }[]).map((detail) => detail.message).join(', ');
          setError(errorMessages);
        } else {
          setError(data.error || 'An error occurred. Please try again.');
        }
        return;
      }
      
      setIsSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError("A network error occurred. Check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const faqItems = [
    {
      question: "What can I do here?",
      answer: "Read and listen to books, and talk with characters by text or voice without changing the story."
    },
    {
      question: "Can I bring my own books?",
      answer: "Yes—start with your own titles and discover platform books too."
    },
    {
      question: "Is voice supported?",
      answer: "Yes—push-to-talk input and audio replies via TTS."
    },
    {
      question: "When do you launch?",
      answer: "We're rolling out in waves to waitlisters first."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Fixed Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/back3.jpg)'
        }}
      />
      
      {/* Header - Hidden */}
      {/* <header className="relative z-10 w-full border-b border-white/20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-lg font-semibold text-white hover:opacity-80 transition-opacity">
            CHATacter Saga
          </Link>
          <ThemeSwitcher />
        </div>
      </header> */}

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="h-[90vh] flex items-center justify-center">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-4">
                <h1 className="text-xl lg:text-3xl font-bold tracking-wide leading-relaxed inline">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    CHATacter Saga 
                  </span>
                </h1>
                <span className="text-xl lg:text-3xl text-white/90 ml-3 tracking-wide leading-relaxed">
                   <br/> <br/>  The Library to <strong>Read, Listen & Chat</strong> with Characters. 
                </span>
              </div>
              <p className="mb-4"></p>
              
              <p className="text-lg lg:text-xl text-white/100 leading-loose tracking-wide mb-8">
                Stop paying $15 per book. Unlock many worlds instead.
              </p>
              
              {/* Main Form */}
              <div className="max-w-md mx-auto mb-12">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Honeypot field for spam detection - hidden from users */}
                    <input
                      type="text"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 h-12 text-lg bg-white/10 border-white/30 text-white placeholder:text-white/60 backdrop-blur-sm"
                        required
                      />
                      <Button
                        type="submit"
                        className="h-12 px-8 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                        disabled={isLoading}
                      >
                        {isLoading ? "Sending..." : "Join the Waitlist"}
                      </Button>
                    </div>



                    {/* Error Message */}
                    {error && (
                      <div className="text-sm text-red-400 bg-red-500/10 p-3 rounded-md border border-red-500/20 tracking-wide leading-relaxed">
                        {error}
                      </div>
                    )}

                    {/* Double opt-in notice */}
                    <p className="text-sm text-white/60 tracking-wide leading-relaxed">
                      Only the good stuff. No spam. Unsubscribe anytime.
                    </p>
                    
                    {/* Arrow pointing down */}
                    <div className="flex justify-center mt-4">
                      <ChevronDown className="w-6 h-6 text-white/60 animate-bounce" />
                    </div>
                  </form>
                ) : (
                  /* Success State */
                  <div className="text-center space-y-4 py-8">
                    <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-white tracking-wide leading-relaxed">Check your email!</h3>
                      <p className="text-white/80 tracking-wide leading-relaxed">
                        We sent a confirmation email to {email}. 
                        Click the link to complete your registration.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="container mx-auto px-4 py-16 lg:py-24">
          {/* Benefits Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-8 tracking-wide leading-relaxed">
              What You Get
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2 tracking-wide leading-relaxed">Read</h3>
                <p className="text-white/80 tracking-wide leading-relaxed">
                  Explore the huge library with different genres. 
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2 tracking-wide leading-relaxed">Chat</h3>
                <p className="text-white/80 tracking-wide leading-relaxed">
                  Ask questions, joke, or have an affair with book characters.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <Volume2 className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2 tracking-wide leading-relaxed">Listen</h3>
                <p className="text-white/80 tracking-wide leading-relaxed">
                  Drive, Run, Relax and listen stories. <br/> Or talk to characters.
                </p>
              </div>
            </div>
          </div>

          {/* How it Works Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-8 tracking-wide leading-relaxed">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 tracking-wide leading-relaxed">Find Your Story</h3>
                <p className="text-white/80 tracking-wide leading-relaxed">
                  Browse our growing library, start reading any title.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-purple-500 rounded-full flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 tracking-wide leading-relaxed">Read & Listen</h3>
                <p className="text-white/80 tracking-wide leading-relaxed">
                  Enjoy seamless switching between text and audio.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-pink-500 rounded-full flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 tracking-wide leading-relaxed">Talk Back</h3>
                <p className="text-white/80 tracking-wide leading-relaxed">
                  Start chating with characters at any moment.
                </p>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="text-center mb-16">
            <div className="flex flex-col items-center gap-6">
              <span className="font-medium text-white text-lg tracking-wide leading-relaxed">
                You're in good company. Already <span className="text-blue-400 font-bold">1,000+</span> readers and creators have joined
              </span>
              
              {/* Scroll to Top Button */}
              <div className="max-w-md mx-auto">
                <div className="flex justify-center">
                  <Button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="h-12 px-8 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    Join the Waitlist
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-8 tracking-wide leading-relaxed">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between text-white hover:bg-white/5 transition-colors"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-semibold tracking-wide">{item.question}</span>
                    <ChevronDown className={cn(
                      "w-5 h-5 transition-transform",
                      openFaq === index && "rotate-180"
                    )} />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4 text-white/80 tracking-wide leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Left - Copyright */}
            <div className="text-sm text-white/60 tracking-wide leading-relaxed">
              © 2025 CHATacter Saga. All rights reserved.
            </div>
            
            {/* Center - Links */}
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-white/60 hover:text-white transition-colors tracking-wide">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/60 hover:text-white transition-colors tracking-wide">
                Terms of Service
              </Link>
              <button className="text-white/60 hover:text-white transition-colors tracking-wide">
                🌐 EN
              </button>
            </div>
            
            {/* Right - Social Links */}
            <div className="flex gap-4">
               <Link href="#" className="text-white/60 hover:text-white transition-colors">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                   <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                 </svg>
                 <span className="sr-only">Discord</span>
               </Link>
               <Link href="#" className="text-white/60 hover:text-white transition-colors">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                   <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                 </svg>
                 <span className="sr-only">GitHub</span>
               </Link>
               <Link href="#" className="text-white/60 hover:text-white transition-colors">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                   <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.0956Z" />
                 </svg>
                 <span className="sr-only">X (Twitter)</span>
               </Link>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}