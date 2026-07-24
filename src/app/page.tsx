import { Metadata } from 'next';
import { SITE_CONFIG, homepageFaqSchema, localBusinessSchema } from '@/lib/seo';

import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AgitationSection from '@/components/sections/AgitationSection';
import SolutionSection from '@/components/sections/SolutionSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ServiceAreaSection from '@/components/sections/ServiceAreaSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import HomepageFAQs from '@/components/sections/HomepageFAQs';
import BookingSection from '@/components/sections/BookingSection';
import CTASection from '@/components/sections/CTASection';
import AboutUsSection from '@/components/sections/AboutUsSection';

export const metadata: Metadata = {
  title: 'L&M Septic Pros | Septic Installation, Repair & Pumping in the Triad, NC',
  description: SITE_CONFIG.description,
}
export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }}
      />
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
        <BookingSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
