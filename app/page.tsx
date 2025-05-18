"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  ShieldCheck,
  Zap,
  Github,
  Linkedin
} from "lucide-react"; // Example icons
import ParticlesBackground from "@/components/landing/ParticlesBackground"; // Add this import

export default function LandingPage() {
  return (
    <div className="relative z-0 flex min-h-screen flex-col text-slate-100">
      <ParticlesBackground /> {/* Add this component */}
      {/* Wrapper for all page content. Removed opaque background to let 3D scene show through. */}
      {/* Dark background will come from body style in globals.css */}
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-black/30 backdrop-blur-md shadow-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-sky-400" /> {/* Placeholder Icon */}
            <span className="text-2xl font-bold text-slate-100">VitalSync</span>
          </Link>
          <nav className="hidden space-x-4 md:flex">
            {/* <Link href="#features" className="text-slate-300 hover:text-sky-400 transition-colors">Features</Link> */}
            {/* <Link href="#about" className="text-slate-300 hover:text-sky-400 transition-colors">About</Link> */}
          </nav>
          <Button asChild className="bg-sky-500 hover:bg-sky-600 text-white">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </header>
      {/* Main Content Area - flex-grow ensures it pushes footer down */}
      <main className="relative z-10 isolate flex-grow">
        {/* Hero Section */}
        <section
          className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 md:py-24"
          style={{ paddingTop: "4rem" }} // Offset for sticky header height
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="animated-gradient-text text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl">
              Sync Your Health, Elevate Your Life.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 md:text-xl">
              VitalSync helps you seamlessly track, understand, and optimize
              your well-being through comprehensive data analysis and actionable
              insights.
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <Button
                size="lg"
                asChild
                className="bg-sky-500 hover:bg-sky-600 text-white group"
              >
                <Link href="/dashboard">
                  Get Started{" "}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-sky-500 text-sky-500 hover:bg-sky-500/10 hover:text-sky-400"
                asChild
              >
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-16 md:py-24 bg-slate-900/80 backdrop-blur-sm"
        >
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl text-slate-100">
              Why VitalSync?
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <FeatureCard
                icon={<BarChart3 className="mb-4 h-12 w-12 text-sky-400" />}
                title="Comprehensive Tracking"
                description="Monitor all aspects of your health, from fitness and sleep to mood and nutrition, all in one place."
              />
              <FeatureCard
                icon={<Zap className="mb-4 h-12 w-12 text-sky-400" />}
                title="Actionable Insights"
                description="Gain personalized insights and recommendations based on your data to make informed health decisions."
              />
              <FeatureCard
                icon={<ShieldCheck className="mb-4 h-12 w-12 text-sky-400" />}
                title="Secure & Private"
                description="Your health data is encrypted and protected, ensuring your privacy and security are paramount."
              />
            </div>

            {/* Added Side Note Section */}
            <div className="mt-16 pt-8 border-t border-slate-700/50 text-center">
              <h3 className="text-2xl font-semibold text-sky-400 mb-4">
                A Note on VitalSync
              </h3>
              <p className="text-slate-300 max-w-3xl mx-auto mb-4">
                Currently, all data displayed within the dashboard is for visual
                and demonstrative purposes only as I am still working on the
                integration capabilities and that could take more time then the
                hackathon deadline for submission.
              </p>
              <p className="text-slate-300 max-w-3xl mx-auto">
                In today's world, many of us use a variety of health and fitness
                wearables from different providers. VitalSync addresses the
                growing need for a centralized platform where you can
                consolidate, view, and analyze all your health data in one
                secure place, regardless of its source. Our goal is to empower
                you with a holistic understanding of your well-being.
              </p>
            </div>
          </div>
        </section>

        {/* Visual Experience Section - This section will be removed or re-purposed */}
        {/* The 3D scene is now the background, so this specific container for it is not needed in the same way */}
        {/*
        <section className="py-16 md:py-24 bg-slate-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-100">Experience VitalSync Visually</h2>
            <div className="bg-slate-800/50 h-96 rounded-lg flex items-center justify-center text-slate-500 relative overflow-hidden shadow-2xl">
              // InteractiveThreeDeeScene was here
            </div>
          </div>
        </section>
        */}
      </main>
      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-sm py-8 text-center">
        <div className="container mx-auto px-4">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} VitalSync. All rights reserved.
            <Link
              href="/privacy"
              className="ml-2 hover:text-sky-400 transition-colors"
            >
              Privacy Policy
            </Link>{" "}
            |
            <Link
              href="/terms"
              className="ml-1 hover:text-sky-400 transition-colors"
            >
              Terms of Service
            </Link>
          </p>
          <p className="text-sm text-slate-400 mt-4">
            Made with{" "}
            <span role="img" aria-label="love">
              ❤️
            </span>{" "}
            and passion for Health Tech by Lalit V.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <Link
              href="https://github.com/Professor833"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-sky-400 transition-colors"
            >
              <Github className="h-6 w-6" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/lalit-vavdara/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-sky-400 transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Component for individual feature cards
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description
}) => {
  return (
    <div className="flex flex-col items-center rounded-lg border border-slate-700/50 bg-slate-800/60 p-6 text-center shadow-xl backdrop-blur-md transition-all hover:shadow-sky-500/20 hover:scale-105">
      {icon}
      <h3 className="mb-2 text-xl font-semibold text-slate-100">
        {title}
      </h3>
      <p className="text-slate-300">
        {description}
      </p>
    </div>
  );
};
