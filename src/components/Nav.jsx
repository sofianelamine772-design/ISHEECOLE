import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Programmes', to: '/programmes' },
  { label: 'Formation Enseignant', to: '/formation-enseignant' },
  { label: 'L\'Institut', to: '/institut' },
  { label: 'Campus', to: '/toulouse' },
  { label: 'Boutique', to: '/boutique' },
  { label: 'Contact', to: '/contact' },
];

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on navigation
  const location = useLocation();
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-white py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo_ishes.png" alt="ISHES" className="h-14 w-auto object-contain" />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm font-semibold transition-colors ${location.pathname === to ? 'text-emerald-700 font-bold' : 'text-gray-500 hover:text-gray-900'}`}
            >
              {label}
            </Link>
          ))}
          <Link to="/inscription" className="btn-primary px-7 py-2.5 text-sm">S'inscrire</Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded-lg border border-gray-200 text-gray-700"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="bg-white border-t border-gray-100 shadow-xl lg:hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
              {navLinks.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className={`py-3 px-3 text-lg font-bold border-b border-gray-50 last:border-0 ${location.pathname === to ? 'text-emerald-700' : 'text-gray-800'}`}
                >
                  {label}
                </Link>
              ))}
              <Link to="/inscription" className="btn-primary mt-4 py-4 text-base text-center w-full block">S'inscrire maintenant</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
