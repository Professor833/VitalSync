import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirect to the dashboard page by default
  redirect('/dashboard');
  
  // Or, if you want to show a landing page first:
  // return (
  //    <main className="flex min-h-screen flex-col items-center justify-center p-24">
  //     <h1 className="text-4xl font-heading mb-4">Welcome to VitalSync</h1>
  //     <p className="text-lg font-sans">Your modern health tracking dashboard.</p>
  //     <a href="/dashboard" className="mt-8 px-6 py-3 bg-vital-sync-blue text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
  //       Go to Dashboard
  //     </a>
  //   </main>
  // );
}
