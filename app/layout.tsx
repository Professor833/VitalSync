import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "VitalSync - Health Dashboard",
  description: "Track your health metrics with VitalSync.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          dmSans.variable
        )}
      >
        {/* Skip to main content link for accessibility */}
        <a 
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:px-4 focus:py-2 focus:top-4 focus:left-4 bg-background text-foreground border rounded-md"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
