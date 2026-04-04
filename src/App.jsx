import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Menu, X, CheckCircle2, Languages, GraduationCap, Users, Trophy, Globe, MessageCircle } from 'lucide-react';

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['Accueil', 'Programmes', 'Toulouse', 'Contact'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-white py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="ISHES" className="h-10 w-auto object-contain" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <a key={l} href="#" className="text-sm font-semibold text-gray-500 hover:text-primary-DEFAULT transition-colors">{l}</a>
          ))}
          <a href="#" className="btn-primary px-7 py-2.5 text-sm">S'inscrire</a>
        </div>

        {/* Burger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 rounded-lg border border-gray-200 text-gray-700">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="bg-white border-t border-gray-100 shadow-xl lg:hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
              {links.map(l => (
                <a key={l} href="#" onClick={() => setMenuOpen(false)} className="py-3 px-3 text-lg font-bold text-gray-800 hover:text-primary-DEFAULT border-b border-gray-50 last:border-0">{l}</a>
              ))}
              <a href="#" className="btn-primary mt-4 py-4 text-base text-center">S'inscrire maintenant</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="pt-28 pb-16 sm:pt-32 md:pt-40 md:pb-24 bg-white overflow-hidden relative">
    {/* BG decoration desktop only */}
    <div className="hidden lg:block absolute top-0 right-0 w-5/12 h-full opacity-[0.07] pointer-events-none">
      <img src="/hero-bg.png" alt="" className="w-full h-full object-cover" />
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-100 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary-DEFAULT animate-pulse" />
            <span className="text-[10px] font-black text-primary-DEFAULT uppercase tracking-widest">Enseignement Supérieur · Toulouse</span>
          </div>

          {/* Title */}
          <h1 className="font-arabic text-[2.4rem] sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.15] mb-7">
            L'excellence de{' '}
            <span className="text-primary-DEFAULT italic">la langue arabe</span>
            {' '}à votre portée.
          </h1>

          <p className="text-base sm:text-lg text-gray-500 font-medium leading-relaxed max-w-xl mb-10">
            Institut de référence à Toulouse. Pédagogie certifiée CECRL pour une maîtrise complète, de débutant à expert.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#" className="btn-primary px-10 py-4 text-base shadow-lg shadow-primary-DEFAULT/20">
              Découvrir nos cours <ArrowRight className="ml-2 w-4 h-4" />
            </a>
            <a href="#" className="btn-outline px-10 py-4 text-base">Nos programmes</a>
          </div>

          {/* Stats */}
          <div className="mt-10 pt-8 border-t border-gray-100 flex flex-wrap items-center gap-8">
            <div>
              <p className="text-2xl font-black text-gray-900">450+</p>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">Étudiants</p>
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">98%</p>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">Réussite</p>
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">6 ans</p>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">D'expérience</p>
            </div>
            {/* Avatar stack */}
            <div className="flex items-center gap-3 sm:ml-auto">
              <div className="flex -space-x-3">
                {[11, 22, 33, 44, 55].map(i => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/80?u=${i}`}
                    alt="Étudiant"
                    className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm"
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, j) => <Star key={j} size={11} fill="currentColor" />)}
                </div>
                <p className="text-[10px] text-gray-400 font-bold mt-0.5">Rejoignez-nous</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Art side — desktop only */}
        <div className="hidden lg:flex relative items-center justify-center">
          <div className="w-full aspect-square bg-gray-50 rounded-[3rem] overflow-hidden border border-gray-100 flex items-center justify-center p-10">
            <img src="/hero-bg.png" alt="Calligraphie" className="w-full h-auto opacity-40" />
          </div>
          <div className="absolute bottom-8 left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-[190px]">
            <div className="flex items-center gap-2 text-primary-DEFAULT mb-2">
              <Trophy size={15} />
              <span className="text-[10px] font-black uppercase tracking-widest">N°1 Toulouse</span>
            </div>
            <p className="text-xs text-gray-500 font-semibold">Meilleur institut de langues 2024.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-20 md:py-32 bg-gray-50 border-y border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-xl mx-auto mb-16">
        <span className="text-[10px] font-black text-primary-DEFAULT uppercase tracking-widest bg-white px-5 py-2 rounded-full border border-gray-100 shadow-sm mb-6 inline-block">Notre méthode</span>
        <h2 className="font-arabic text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">Apprentissage <span className="text-primary-DEFAULT italic">supérieur.</span></h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { Icon: Languages, title: 'Supports Numériques', desc: 'Portail e-learning disponible 24h/7j avec ressources interactives.' },
          { Icon: GraduationCap, title: 'Diplômes Certifiés', desc: 'Programmes alignés sur le cadre européen CECRL (A1→C2).' },
          { Icon: Users, title: 'Groupes Réduits', desc: '8 étudiants max pour un suivi optimal et une progression rapide.' },
        ].map(({ Icon, title, desc }) => (
          <div key={title} className="p-8 md:p-10 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-primary-DEFAULT transition-colors">
              <Icon className="w-6 h-6 text-primary-DEFAULT group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-arabic text-xl font-black text-gray-900 mb-3">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ToulouseSection = () => (
  <section className="py-20 md:py-32 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="rounded-3xl lg:rounded-[3rem] overflow-hidden h-72 sm:h-96 lg:h-[550px] shadow-2xl border border-gray-100">
          <img src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=1600" alt="Toulouse" className="w-full h-full object-cover" />
        </div>
        <div>
          <span className="text-[10px] font-black text-primary-DEFAULT uppercase tracking-widest block mb-5">Implantation Locale</span>
          <h2 className="font-arabic text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8">Centre de <span className="text-primary-DEFAULT italic">Toulouse.</span></h2>
          <p className="text-gray-500 font-medium leading-relaxed mb-10">Salles climatisées à 2 minutes du métro Jean Jaurès, au cœur de Toulouse.</p>
          <div className="grid grid-cols-2 gap-5 mb-12">
            {['Métro J. Jaurès', 'Climatisation HQ', 'Wi-Fi Fibre', 'Café Étudiant'].map(item => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary-DEFAULT flex-shrink-0" />
                <span className="text-sm font-bold text-gray-700">{item}</span>
              </div>
            ))}
          </div>
          <a href="#" className="btn-primary px-12 py-4 text-base shadow-lg shadow-primary-DEFAULT/20">Visiter l'Institut</a>
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-16 md:py-24 bg-gray-50 border-y border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-16">
        <h2 className="font-arabic text-4xl md:text-5xl font-black text-gray-900">Paroles d'étudiants.</h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-8">
        {[
          { name: 'Sarah M.', text: "Une méthode incroyable. J'ai progressé plus en 3 mois qu'en 1 an seule." },
          { name: 'Mehdi R.', text: "Le meilleur centre spécialisé de Toulouse. Professeurs excellents." }
        ].map((t, i) => (
          <div key={i} className="p-8 md:p-10 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-200/50">
            <div className="flex gap-1 text-amber-400 mb-6">
              {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
            </div>
            <p className="text-lg font-medium text-gray-700 italic border-l-4 border-primary-DEFAULT pl-5 mb-8 leading-relaxed">"{t.text}"</p>
            <div className="pt-5 border-t border-gray-50">
              <span className="font-black text-gray-900">{t.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section className="py-20 md:py-32">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="bg-primary-DEFAULT rounded-3xl md:rounded-[3.5rem] px-8 py-16 md:px-20 md:py-24 text-center text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-arabic text-4xl sm:text-5xl md:text-7xl font-black mb-8 leading-tight">Prêt à commencer ?</h2>
          <p className="text-lg md:text-xl opacity-80 mb-12 font-medium leading-relaxed">Prochaine session à Toulouse. Places limitées.</p>
          <a href="#" className="inline-block bg-white text-primary-DEFAULT px-12 py-5 rounded-2xl font-black text-lg shadow-2xl hover:scale-105 transition-transform">Réserver ma place</a>
        </div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 blur-3xl rounded-full pointer-events-none" />
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="mx-3 mb-6 rounded-[2.5rem] bg-[#022C22] text-white overflow-hidden shadow-2xl">
    <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-16 pb-10">
      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-14">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="ISHES" className="h-12 w-auto object-contain brightness-[10] grayscale" />
            <span className="text-xl font-black uppercase tracking-tight">ISHES</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">Excellence académique et tradition pédagogique à Toulouse.</p>
          <div className="flex items-center gap-5">
            <Globe size={22} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
            <MessageCircle size={22} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Formations */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-black mb-6">Formations</h4>
          <ul className="flex flex-col gap-4 text-sm text-gray-400 font-semibold">
            <li><a href="#" className="hover:text-white transition-colors">Arabe Littéraire</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Arabe Dialectal</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Sessions Intensives</a></li>
          </ul>
        </div>

        {/* Institut */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-black mb-6">Institut</h4>
          <ul className="flex flex-col gap-4 text-sm text-gray-400 font-semibold">
            <li><a href="#" className="hover:text-white transition-colors">Notre Campus</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Professeurs</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Recrutement</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-black mb-6">Contact</h4>
          <ul className="flex flex-col gap-4 text-sm text-gray-400 font-semibold">
            <li><a href="#" className="hover:text-white transition-colors">Inscriptions</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-gray-600 uppercase tracking-widest font-bold">
        <p>&copy; {new Date().getFullYear()} ISHES Institut — Toulouse</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
          <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="bg-white min-h-screen">
      <Nav />
      <Hero />
      <Features />
      <ToulouseSection />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
}
