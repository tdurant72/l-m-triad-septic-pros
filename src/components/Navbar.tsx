"use client";
import { useState, useEffect } from 'react';

export default function NavBar() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['services', 'protection-plan', 'service-area', 'testimonials'];
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        // Using window.scrollY and bounding rectangles provides better accuracy
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the element is visible in the viewport or slightly above it
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = section;
          }
        }
      }

      // If we scroll to the very top, clear active section or default to first
      if (window.scrollY < 100) {
        current = ''; // Or leave it as is if you prefer
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'services', label: 'Services' },
    { id: 'protection-plan', label: 'Protection Plan' },
    { id: 'service-area', label: 'Service Area' },
    { id: 'testimonials', label: 'Testimonials' },
  ];

  const handleClick = (id: string) => {
    setActiveSection(id);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-[0_2px_10px_rgba(15,23,42,0.02)] transition-all duration-300">
      <div className="flex justify-between items-center max-w-[1280px] mx-auto px-6 h-20">
        <div className="text-xl font-black tracking-tight text-[#0F172A] uppercase font-['Manrope']">
          L&M Septic
        </div>
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <a
              key={link.id}
              onClick={() => handleClick(link.id)}
              className={`font-['Work_Sans'] text-xs font-semibold tracking-wider uppercase transition-all duration-300 border-b-2 pb-1 ${activeSection === link.id
                  ? 'text-brand-green border-brand-green hover:border-brand-green'
                  : 'text-[#64748B] border-transparent hover:text-brand-green hover:border-transparent'
                }`}
              href={`#${link.id}`}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex gap-4 items-center">
          <a href="tel:3365786972" className="hidden sm:flex items-center gap-2 font-['Work_Sans'] text-sm font-bold tracking-wider text-[#0F172A] hover:text-brand-green transition-colors">
            <span className="material-symbols-outlined text-brand-green">call</span> (336) 578-6972
          </a>
          <a href="tel:3365786972" className="bg-brand-green text-white px-6 py-3 font-['Work_Sans'] font-semibold tracking-wider uppercase text-xs rounded-xl shadow-[0_4px_12px_rgba(14,118,59,0.2)] hover:bg-brand-green-hover hover:shadow-[0_6px_16px_rgba(14,118,59,0.3)] active:scale-95 transform transition-all flex items-center justify-center">
            Call Now
          </a>
        </div>
      </div>
    </nav>
  );
}
