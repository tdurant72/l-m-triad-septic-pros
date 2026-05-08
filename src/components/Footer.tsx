export default function Footer() {
  return (
    <footer className="bg-white w-full border-t border-[#E2E8F0] mt-auto" id="about">
      <div className="max-w-[1280px] mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div className="flex flex-col gap-4">
          <div className="text-xl font-black tracking-tight text-[#0F172A] uppercase font-['Manrope']">
            L&amp;M Septic
          </div>
          <p className="font-['Manrope'] text-sm text-[#64748B]">
            © 2024 L&amp;M Septic. Household Peace of Mind.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <a className="font-['Manrope'] text-sm text-[#64748B] hover:text-brand-green transition-colors underline decoration-[#E2E8F0] underline-offset-4" href="#">Privacy Policy</a>
          <a className="font-['Manrope'] text-sm text-[#64748B] hover:text-brand-green transition-colors underline decoration-[#E2E8F0] underline-offset-4" href="#">Terms of Service</a>
          <a className="font-['Manrope'] text-sm text-[#64748B] hover:text-brand-green transition-colors underline decoration-[#E2E8F0] underline-offset-4" href="#">Emergency Contact</a>
          <a className="font-['Manrope'] text-sm text-[#64748B] hover:text-brand-green transition-colors underline decoration-[#E2E8F0] underline-offset-4" href="#">Careers</a>
        </div>
        <div className="flex gap-6">
          <span className="material-symbols-outlined text-[#94A3B8] cursor-pointer hover:text-brand-green transition-colors transform hover:-translate-y-1">social_leaderboard</span>
          <span className="material-symbols-outlined text-[#94A3B8] cursor-pointer hover:text-brand-green transition-colors transform hover:-translate-y-1">linked_camera</span>
        </div>
      </div>
    </footer>
  );
}
