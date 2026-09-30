import Header from '@/app/_components/Header';
import Footer from '@/app/_components/Footer';

export default function SupportFeedbackPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#020617] text-white">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center text-center p-8 mt-16">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-6">Support Feedback</h1>
        <p className="text-slate-300 text-lg max-w-2xl">
          This page is currently under construction. Please check back later.
        </p>
      </main>
      <Footer />
    </div>
  );
}
