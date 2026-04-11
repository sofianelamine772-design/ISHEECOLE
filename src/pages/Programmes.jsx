import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, Award, BookOpen, CheckCircle2, Monitor, MapPin } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';

const programmes = [
  {
    type: 'presentiel',
    level: 'A1 — A2',
    badge: 'Débutant',
    badgeColor: 'bg-blue-50 text-blue-700',
    title: 'Arabe Littéraire — Présentiel',
    desc: 'Découvrez les bases de la langue arabe classique à Toulouse. Alphabet, phonétique et grammaire fondamentale.',
    duration: '3 mois',
    sessions: '2 séances / semaine',
    size: '8 étudiants max',
    price: '290 €',
    items: ['Alphabet & phonétique', 'Vocabulaire de base', 'Grammaire fondamentale', 'Exercices oraux'],
  },
  {
    type: 'distanciel',
    level: 'A1 — A2',
    badge: 'En ligne',
    badgeColor: 'bg-sky-50 text-sky-700',
    title: 'Arabe Littéraire — Distanciel',
    desc: 'Suivez nos cours en direct via Zoom avec nos professeurs certifiés. Flexibilité totale depuis chez vous.',
    duration: '3 mois',
    sessions: '2 séances / semaine',
    size: '10 étudiants max',
    price: '240 €',
    items: ['Cours en direct (Replay dispo)', 'Supports PDF inclus', 'Accès plateforme e-learning', 'Q&A en direct'],
    highlight: true,
  },
  {
    type: 'presentiel',
    level: 'B1 — B2',
    badge: 'Intermédiaire',
    badgeColor: 'bg-emerald-50 text-emerald-700',
    title: 'Conversation & Consolidation',
    desc: 'Approfondissez votre maîtrise à Toulouse. Textes complexes et conversation courante.',
    duration: '4 mois',
    sessions: '2 séances / semaine',
    size: '8 étudiants max',
    price: '360 €',
    items: ['Lecture de textes authentiques', 'Expression écrite avancée', 'Vocabulaire thématique', 'Conversation guidée'],
  },
  {
    type: 'distanciel',
    level: 'B1 — C1',
    badge: 'Premium Online',
    badgeColor: 'bg-indigo-50 text-indigo-700',
    title: 'Masterclass Arabe Online',
    desc: 'Un programme intensif en ligne pour atteindre un niveau opérationnel rapidement.',
    duration: '5 mois',
    sessions: '3 séances / semaine',
    size: '12 étudiants max',
    price: '420 €',
    items: ['Coaching personnalisé', 'Accès illimité aux ressources', 'Groupes de travail privés', 'Certification digitale'],
  },
  {
    type: 'presentiel',
    level: 'Tous niveaux',
    badge: 'Dialectal',
    badgeColor: 'bg-orange-50 text-orange-700',
    title: 'Darija & Levantin (Toulouse)',
    desc: 'Maîtrisez l\'arabe parlé du quotidien. Focus sur le dialecte maghrébin et levantin.',
    duration: '2 mois',
    sessions: '2 séances / semaine',
    size: '8 étudiants max',
    price: '220 €',
    items: ['Darija marocaine & algérienne', 'Arabe levantin', 'Situations du quotidien', 'Immersion totale'],
  },
  {
    type: 'distanciel',
    level: 'Enfants',
    badge: 'Junior Online',
    badgeColor: 'bg-pink-50 text-pink-700',
    title: 'Arabe Ludique Enfants',
    desc: 'Méthode interactive en ligne pour les 6-12 ans. Apprentissage par le jeu.',
    duration: 'Annuel',
    sessions: '1 séance / semaine',
    size: '8 enfants max',
    price: '180 €',
    items: ['Activités interactives', 'Supports ludiques', 'Suivi parental régulier', 'Jeux éducatifs online'],
  },
];

export default function Programmes() {
  const [activeTab, setActiveTab] = useState('presentiel');

  const filteredProgrammes = programmes.filter(p => p.type === activeTab);

  return (
    <div className="bg-white min-h-screen">
      <Nav />

      {/* Header */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-2xl">
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest block mb-5">Nos Formations</span>
              <h1 className="font-arabic text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                Choisissez votre <span className="text-emerald-700 italic">mode d'apprentissage.</span>
              </h1>
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                Que vous soyez à Toulouse ou ailleurs, nous avons le programme idéal pour votre progression.
              </p>
            </motion.div>

            {/* Tab Switcher */}
            <div className="flex p-1.5 bg-gray-200/50 rounded-2xl w-fit border border-gray-200 self-start md:self-auto">
              <button 
                onClick={() => setActiveTab('presentiel')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'presentiel' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <MapPin size={16} /> Présentiel
              </button>
              <button 
                onClick={() => setActiveTab('distanciel')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'distanciel' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Monitor size={16} /> Distanciel
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Programmes Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                  className={`rounded-3xl border flex flex-col overflow-hidden ${p.highlight ? 'border-emerald-200 shadow-2xl shadow-emerald-900/10' : 'border-gray-100 shadow-sm'}`}
                >
                  {p.highlight && (
                    <div className="bg-emerald-700 text-white text-center py-2.5 text-[10px] font-black uppercase tracking-widest">
                      ★ Recommandé
                    </div>
                  )}
                  <div className="p-8 flex flex-col flex-1 bg-white">
                    <div className="flex items-start justify-between mb-6">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${p.badgeColor}`}>{p.badge}</span>
                      <span className="text-xs text-gray-400 font-bold">{p.level}</span>
                    </div>
                    <h3 className="font-arabic text-xl font-black text-gray-900 mb-3">{p.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-6 h-12 overflow-hidden">{p.desc}</p>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="flex items-center gap-2 text-xs text-gray-500"><Clock size={13} className="text-emerald-600" />{p.duration}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-500"><BookOpen size={13} className="text-emerald-600" />{p.sessions}</div>
                      <div className="flex items-center gap-3 text-xs text-gray-500"><Users size={13} className="text-emerald-600" />{p.size}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-500"><Award size={13} className="text-emerald-600" />Certifié</div>
                    </div>

                    <ul className="flex flex-col gap-2 mb-8 flex-1">
                      {p.items.map(item => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 flex-shrink-0" />{item}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                      <div>
                        <p className="text-2xl font-black text-gray-900">{p.price}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">/ session</p>
                      </div>
                      <Link to="/inscription" className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all hover:scale-105 ${p.highlight ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-900/20' : 'bg-gray-50 text-gray-900 hover:bg-emerald-700 hover:text-white'}`}>
                        Détails <ArrowRight size={14} className="inline ml-1" />
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
      <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-arabic text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">Questions fréquentes.</h2>
          <div className="flex flex-col gap-6">
            {[
              { q: 'Puis-je changer de mode en cours d\'année ?', a: 'Oui, sous réserve de places disponibles, vous pouvez passer du distanciel au présentiel si votre emploi du temps change.' },
              { q: 'Comment se passent les cours en ligne ?', a: 'Ils ont lieu en direct sur Zoom avec un professeur. Vous pouvez interagir, poser vos questions et les cours sont enregistrés si vous ratez une séance.' },
              { q: 'Où se situe l\'institut à Toulouse ?', a: 'Nous sommes situés en plein centre-ville, à deux pas du métro Jean Jaurès, pour un accès facile.' },
            ].map(({ q, a }) => (
              <div key={q} className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <p className="font-bold text-gray-900 mb-3">{q}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <Footer />
    </div>
  );
}
