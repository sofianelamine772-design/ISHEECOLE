import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, Award, BookOpen, CheckCircle2, Monitor, MapPin } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';

const programmes = [
  // ADULTES
  {
    type: 'presentiel',
    category: 'ADULTES',
    level: '8 mois',
    badge: 'Standard',
    badgeColor: 'bg-emerald-50 text-emerald-700',
    title: 'Tajwid (Standard)',
    desc: 'Apprends à lire le Coran correctement en respectant les règles de Tajwid. Méthode exclusive ISHES.',
    duration: 'Cours hebdomadaire',
    sessions: 'Direct + Replay',
    size: 'Certificat inclus',
    price: '349 €',
    items: ['Lecture correcte', 'Application des règles', 'Fluidité & Prononciation', 'Suivi WhatsApp'],
    id: 'adult_tajwid'
  },
  {
    type: 'distanciel',
    category: 'ADULTES',
    level: '3 mois',
    badge: 'Intensif',
    badgeColor: 'bg-amber-50 text-amber-700',
    title: 'Tajwid Intensif',
    desc: '3 mois pour transformer ta lecture du Coran. Ce que d\'autres mettent 2 ans à maîtriser.',
    duration: '2 cours / semaine',
    sessions: 'Suivi quotidien',
    size: 'Accélération forte',
    price: '649 €',
    items: ['Méthode intensive', 'Lecture rapide', 'Autonomie totale', 'Coaching audio'],
    highlight: true,
    id: 'adult_tajwid_intensif'
  },
  {
    type: 'presentiel',
    category: 'ADULTES',
    level: '4 ou 8 mois',
    badge: 'Fluidité',
    badgeColor: 'bg-blue-50 text-blue-700',
    title: 'Tilawa',
    desc: 'Pour que ta récitation devienne une connexion avec ALLAH. Amélioration de la beauté du rythme.',
    duration: 'Flexible',
    sessions: 'Direct + Replay',
    size: 'Niveau Avancé',
    price: '349 €',
    items: ['Correction précise', 'Rythme & Aisance', 'Fluidité de lecture', 'Connexion spirituelle'],
    id: 'adult_tilawa'
  },
  {
    type: 'presentiel',
    category: 'ADULTES',
    level: 'Continu',
    badge: 'Mémorisation',
    badgeColor: 'bg-indigo-50 text-indigo-700',
    title: 'Hifdh',
    desc: 'Apprends le Coran pour qu\'il t\'accompagne partout. Un cadre structuré pour mémoriser sereinement.',
    duration: 'Suivi régulier',
    sessions: 'Audio + Direct',
    size: 'Tous niveaux',
    price: '349 €',
    items: ['Mémorisation guidée', 'Consolidation', 'Méthode ISHES', 'Suivi personnalisé'],
    id: 'adult_hifdh'
  },
  {
    type: 'distanciel',
    category: 'ENFANTS',
    level: 'Annuel',
    badge: 'Junior',
    badgeColor: 'bg-pink-50 text-pink-700',
    title: 'Arabe & Coran Enfants',
    desc: 'Méthode ludique pour enfants et ados. Arabe, Coran, Tajwid et Éducation Islamique.',
    duration: 'Hebdomadaire',
    sessions: 'WhatsApp + Zoom',
    size: '6-15 ans',
    price: '349 €',
    items: ['Pédagogie adaptée', 'Replay à vie', 'Éducation islamique', 'Certificat final'],
    id: 'kids_global'
  },
  {
    type: 'presentiel',
    category: 'ADULTES',
    level: '8 mois',
    badge: 'Savoir',
    badgeColor: 'bg-purple-50 text-purple-700',
    title: 'Fiqh Malikite',
    desc: 'Pratique ta religion avec clarté. Apprentissage des règles de l\'Islam + Aqida inclus.',
    duration: 'Hebdomadaire',
    sessions: 'Direct + Replay',
    size: 'Théorie & Pratique',
    price: '349 €',
    items: ['Jurisprudence claire', 'Fondements Aqida', 'Pratique sereine', 'Questions/Réponses'],
    id: 'adult_fiqh'
  }
];

export default function Programmes() {
  const [activeTab, setActiveTab] = useState('presentiel');
  const filteredProgrammes = programmes.filter(p => p.type === activeTab);

  return (
    <div className="bg-white min-h-screen">
      <Nav />

      {/* Header */}
      <section className="pt-32 pb-12 md:pt-44 md:pb-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest block mb-5">Nos Formations</span>
              <h1 className="font-arabic text-[2.2rem] sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-[1.1]">
                Choisissez votre <br className="hidden sm:block" /> <span className="text-emerald-700 italic">mode d'apprentissage.</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-500 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                Que vous soyez à Toulouse ou ailleurs, nous avons le programme idéal pour votre progression.
              </p>
            </motion.div>

            {/* Tab Switcher */}
            <div className="flex p-1.5 bg-gray-200/40 rounded-[2rem] w-full sm:w-fit border border-gray-200/60 mx-auto lg:mx-0 shadow-inner">
              <button 
                onClick={() => setActiveTab('presentiel')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-black transition-all ${activeTab === 'presentiel' ? 'bg-white text-emerald-700 shadow-md translate-y-[-1px]' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <MapPin size={16} /> Présentiel
              </button>
              <button 
                onClick={() => setActiveTab('distanciel')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-black transition-all ${activeTab === 'distanciel' ? 'bg-white text-emerald-700 shadow-md translate-y-[-1px]' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Monitor size={16} /> Distanciel
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Programmes Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProgrammes.map((p, i) => (
                <motion.div
                  key={p.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-[2.5rem] border flex flex-col overflow-hidden transition-all duration-500 ${p.highlight ? 'border-emerald-200 shadow-2xl shadow-emerald-900/10' : 'border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50'}`}
                >
                  {p.highlight && (
                    <div className="bg-emerald-700 text-white text-center py-2.5 text-[10px] font-black uppercase tracking-widest">
                      ★ Recommandé
                    </div>
                  )}
                  <div className="p-8 md:p-10 flex flex-col flex-1 bg-white">
                    <div className="flex items-start justify-between mb-6">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${p.badgeColor}`}>{p.badge}</span>
                      <span className="text-xs text-gray-400 font-bold">{p.level}</span>
                    </div>
                    <h3 className="font-arabic text-xl sm:text-2xl font-black text-gray-900 mb-3">{p.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-6 h-12 overflow-hidden">{p.desc}</p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-tight"><Clock size={14} className="text-emerald-600" />{p.duration}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-tight"><BookOpen size={14} className="text-emerald-600" />{p.sessions}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-tight"><Users size={14} className="text-emerald-600" />{p.size}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-tight"><Award size={14} className="text-emerald-600" />Certifié</div>
                    </div>

                    <ul className="flex flex-col gap-3 mb-10 flex-1">
                      {p.items.map(item => (
                        <li key={item} className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                          <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />{item}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between border-t border-gray-50 pt-8 mt-auto">
                      <div>
                        <p className="text-2xl sm:text-3xl font-black text-gray-900">{p.price}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">/ session</p>
                      </div>
                      <Link to="/inscription" className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 ${p.highlight ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-900/20' : 'bg-gray-50 text-gray-900 hover:bg-emerald-700 hover:text-white'}`}>
                        S'inscrire
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-32 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-arabic text-3xl md:text-5xl font-black text-gray-900 mb-16 text-center">Questions fréquentes.</h2>
          <div className="flex flex-col gap-6">
            {[
              { q: 'Puis-je changer de mode en cours d\'année ?', a: 'Oui, sous réserve de places disponibles, vous pouvez passer du distanciel au présentiel si votre emploi du temps change.' },
              { q: 'Comment se passent les cours en ligne ?', a: 'Ils ont lieu en direct sur Zoom avec un professeur. Vous pouvez interagir, poser vos questions et les cours sont enregistrés si vous ratez une séance.' },
              { q: 'Où se situe l\'institut à Toulouse ?', a: 'Nous sommes situés en plein centre-ville, à deux pas du métro Jean Jaurès, pour un accès facile.' },
            ].map(({ q, a }, idx) => (
              <motion.div 
                key={q} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="font-black text-gray-900 mb-4 text-lg">{q}</p>
                <p className="text-base text-gray-500 leading-relaxed font-medium">{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <Footer />
    </div>
  );
}
