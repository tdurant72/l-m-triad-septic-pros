import { Metadata } from 'next';
import { SITE_CONFIG, homepageFaqSchema } from '@/lib/seo';

import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AgitationSection from '@/components/sections/AgitationSection';
import SolutionSection from '@/components/sections/SolutionSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ServiceAreaSection from '@/components/sections/ServiceAreaSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import HomepageFAQs from '@/components/sections/HomepageFAQs';
import CTASection from '@/components/sections/CTASection';
import AboutUsSection from '@/components/sections/AboutUsSection';

export const metadata: Metadata = {
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
}
export default function Home() {
  return (
    <>
      <NavBar />
      <main className="pt-20 flex-grow overflow-x-hidden">
        <HeroSection />
        <AgitationSection />
        <SolutionSection />
        <ServicesSection />
        <AboutUsSection />
        <ServiceAreaSection />
        <TestimonialsSection />
        <HomepageFAQs />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
