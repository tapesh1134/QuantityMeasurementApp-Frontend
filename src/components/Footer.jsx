import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-12 px-6 bg-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-indigo-100/60 text-sm">
        <div className="text-lg font-bold text-white">QuantMeasure</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
        <div>© 2026 QuantMeasure Inc. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;