import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="relative px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Transform Your
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"> Financial Future?</span>
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Join thousands of users who have already optimized their spending and increased their savings with SpendPilot.
        </p>
        <Link href="/upload-statement">
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-0 px-12 py-6 text-xl animate-pulse-button">
            Start Your Analysis Now
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
