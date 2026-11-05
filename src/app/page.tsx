import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';
import RecentWorksSection from '@/components/RecentWorksSection';
import HowToBookSection from '@/components/HowToBookSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-dark selection:bg-brand-burgundy selection:text-brand-bg-light">
      {/* Sticky editorial header */}
      <Navbar />

      {/* Main landing content */}
      <main className="flex-1">
        <Hero />
        <ServicesSection />
        <RecentWorksSection />
        <HowToBookSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
