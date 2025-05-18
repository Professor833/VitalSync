'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, ShieldCheck, Zap } from 'lucide-react'; // Example icons

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-50 flex flex-col">
      {/* Header/Nav */}
      <header className="py-6 px-4 md:px-8 sticky top-0 z-50 bg-slate-900/50 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            VitalSync
          </Link>
          <Link href="/dashboard" legacyBehavior passHref>
            <Button variant="outline" className="bg-transparent border-slate-400 hover:bg-slate-700 hover:text-slate-50">
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content - Skip target */}
      <main id="main-content" className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 text-center container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 animate-gradient-x">
            Sync Your Health, Elevate Your Life.
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10">
            VitalSync helps you seamlessly track, analyze, and understand your well-being, empowering you to make informed decisions for a healthier lifestyle.
          </p>
          <Link href="/dashboard" legacyBehavior passHref>
            <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              Access Your Dashboard <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </section>

        {/* Features Section Placeholder */}
        <section className="py-16 md:py-24 bg-slate-800/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-100">Discover VitalSync's Power</h2>
            <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">Key features designed to give you comprehensive insights and control over your health data.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-slate-700/70 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex justify-center items-center mb-4">
                    <BarChart3 className="h-12 w-12 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-50">Comprehensive Tracking</h3>
                <p className="text-slate-300 text-sm">
                  Monitor everything from sleep and fitness to mood and hydration, all in one place.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="bg-slate-700/70 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex justify-center items-center mb-4">
                    <Zap className="h-12 w-12 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-50">Actionable Insights</h3>
                <p className="text-slate-300 text-sm">
                  Gain personalized recommendations and identify correlations to optimize your well-being.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="bg-slate-700/70 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                 <div className="flex justify-center items-center mb-4">
                    <ShieldCheck className="h-12 w-12 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-50">Secure & Private</h3>
                <p className="text-slate-300 text-sm">
                  Your health data is sensitive. We prioritize your privacy and security with robust measures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Optional: Animated Section Placeholder (e.g., for Three.js) */}
        {/* 
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-100">Experience VitalSync Visually</h2>
            <div className="bg-slate-800 h-96 rounded-lg flex items-center justify-center text-slate-500">
              [Interactive Animation / Three.js Canvas Placeholder]
            </div>
          </div>
        </section>
        */}

      </main>

      {/* Footer */}
      <footer className="py-8 text-center bg-slate-900/70">
        <div className="container mx-auto px-4">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} VitalSync. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Basic CSS for gradient animation (can be moved to globals.css if preferred)
const style = document.createElement('style');
style.innerHTML = `
  @keyframes gradient-x {
    0%, 100% {
      background-size: 200% 200%;
      background-position: left center;
    }
    50% {
      background-size: 200% 200%;
      background-position: right center;
    }
  }
  .animate-gradient-x {
    animation: gradient-x 5s ease infinite;
  }
`;
document.head.appendChild(style);
