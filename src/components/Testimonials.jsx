import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Fatmaa Elbechir",
    role: "Étudiante",
    comment: "Un institut d’exception. Une référence pour l'apprentissage. Professeurs bienveillants et qualifiés.",
    rating: 5
  },
  {
    name: "Perfect Beauty",
    role: "Étudiante",
    comment: "Cours de grande qualité adaptés aux enfants et adultes. Format en ligne structuré et efficace.",
    rating: 5
  },
  {
    name: "Zaineb SB",
    role: "Maman d'élève",
    comment: "Ravi des progrès obtenus depuis le début des cours. Les enseignantes sont à l'écoute et motivantes.",
    rating: 5
  },
  {
    name: "Fanny Vincent",
    role: "Parent d'élève",
    comment: "Pédagogie excellente, explications simples. Les enfants adorent les cours à distance.",
    rating: 5
  },
  {
    name: "Abdoullah M.",
    role: "Étudiant",
    comment: "Efficace, sérieux et très professionnel. Je recommande vivement pour progresser vite.",
    rating: 5
  },
  {
    name: "Sarah L.",
    role: "Étudiante",
    comment: "La méthode Nour Al Bayan est incroyable. On apprend à lire très rapidement !",
    rating: 5
  }
];

// Double original list for seamless scroll
const allTestimonials = [...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50/50 overflow-hidden" id="temoignages">
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest bg-emerald-100/50 px-4 py-1.5 rounded-full mb-6 inline-block">Approuvé par la communauté</span>
        <h2 className="font-arabic text-4xl md:text-5xl font-black text-gray-900 leading-tight">
          Ce que nos <span className="text-emerald-700 italic">étudiants</span> pensent.
        </h2>
      </div>

      {/* Marquee Container */}
      <div className="relative flex overflow-hidden group">
        <div className="flex animate-marquee group-hover:pause-marquee whitespace-nowrap">
          {allTestimonials.map((t, idx) => (
            <div 
              key={idx}
              className="mx-4 flex-shrink-0 w-[320px] bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="#FBBF24" className="text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed font-medium mb-6 whitespace-normal italic">
                "{t.comment}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white font-black text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .pause-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
