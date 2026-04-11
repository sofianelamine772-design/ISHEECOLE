import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#022C22] text-white overflow-hidden rounded-t-[5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-16 pb-10">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-14">

          {/* Brand + Contact */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-4">
              <img src="/logo.png" alt="ISHES" className="h-12 w-auto object-contain brightness-[10] grayscale" />
              <span className="text-xl font-black uppercase tracking-tight">ISHES</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Institut d'enseignement supérieur spécialisé en langue arabe, à Toulouse.
            </p>

            {/* Real contact info */}
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="https://maps.google.com/?q=41+Boulevard+de+Thibaud+31100+Toulouse"
                target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-gray-400 hover:text-white transition-colors"
              >
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-emerald-400" />
                <span>41 Boulevard de Thibaud<br />31100 Toulouse</span>
              </a>
              <a href="mailto:contact@ishes.fr" className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors">
                <Mail size={14} className="flex-shrink-0 text-emerald-400" />
                <span>contact@ishes.fr</span>
              </a>
              <a href="tel:+33768652091" className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors">
                <Phone size={14} className="flex-shrink-0 text-emerald-400" />
                <span>+33 7 68 65 20 91</span>
              </a>
              <a href="tel:+33666033519" className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors">
                <Phone size={14} className="flex-shrink-0 text-emerald-400" />
                <span>+33 6 66 03 35 19</span>
              </a>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <Globe size={20} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
              <MessageCircle size={20} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Formations */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-black mb-6">Formations</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400 font-semibold">
              <li><Link to="/programmes" className="hover:text-white transition-colors">Arabe Littéraire</Link></li>
              <li><Link to="/programmes" className="hover:text-white transition-colors">Arabe Dialectal</Link></li>
              <li><Link to="/programmes" className="hover:text-white transition-colors">Sessions Intensives</Link></li>
              <li><Link to="/inscription" className="hover:text-white transition-colors text-emerald-300">S'inscrire →</Link></li>
            </ul>
          </div>

          {/* Institut */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-black mb-6">Institut</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400 font-semibold">
              <li><Link to="/institut" className="hover:text-white transition-colors">Notre Histoire</Link></li>
              <li><Link to="/toulouse" className="hover:text-white transition-colors">Le Campus</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Recrutement</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-black mb-6">Contact</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400 font-semibold">
              <li><Link to="/contact" className="hover:text-white transition-colors">Nous écrire</Link></li>
              <li><a href="tel:+33768652091" className="hover:text-white transition-colors">Appeler</a></li>
              <li><Link to="/inscription" className="hover:text-white transition-colors">Inscriptions</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-gray-600 uppercase tracking-widest font-bold">
          <p>&copy; {new Date().getFullYear()} ISHES Institut — Toulouse</p>
          <div className="flex gap-6">
            <Link to="/mentions-legales" className="hover:text-white transition-colors">Mentions Légales</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Confidentialité</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
