import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, Award, BookOpen, CheckCircle2 } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
const programmes = [
  {
    level: 'A1 — A2',
    badge: 'Débutant',
    badgeColor: 'bg-blue-50 text-blue-700',
    title: 'Arabe Littéraire — Initiation',
    desc: 'Découvrez les bases de la langue arabe classique. Alphabet, phonétique, grammaire fondamentale et vocabulaire essentiel pour communiquer les premières phrases.',
    duration: '3 mois',
    sessions: '2 séances / semaine',
    size: '8 étudiants max',
    price: '290 €',
    items: ['Alphabet & phonétique', 'Vocabulaire de base (500 mots)', 'Grammaire fondamentale', 'Exercices écrits & oraux'],
  },
  {
    level: 'B1 — B2',
    badge: 'Intermédiaire',
    badgeColor: 'bg-emerald-50 text-emerald-700',
    title: 'Arabe Littéraire — Consolidation',
    desc: 'Approfondissez votre maîtrise de la langue standard. Textes complexes, conjugaison avancée et conversation courante pour atteindre un niveau opérationnel.',
    duration: '4 mois',
    sessions: '2 séances / semaine',
    size: '8 étudiants max',
    price: '360 €',
    items: ['Lecture de textes authentiques', 'Expression écrite avancée', 'Vocabulaire thématique', 'Conversation guidée'],
    highlight: true,
  },
  {
    level: 'C1 — C2',
    badge: 'Avancé',
    badgeColor: 'bg-purple-50 text-purple-700',
    title: 'Arabe Littéraire — Maîtrise',
    desc: 'Atteignez un niveau d\'excellence. Littérature classique, rhétorique arabe, analyse de textes religieux et philosophiques pour une maîtrise complète.',
    duration: '6 mois',
    sessions: '3 séances / semaine',
    size: '6 étudiants max',
    price: '490 €',
    items: ['Littérature classique & moderne', 'Rhétorique & stylistique', 'Textes religieux & philosophiques', 'Certification officielle'],
  },
  {
    level: 'Tous niveaux',
    badge: 'Dialectal',
    badgeColor: 'bg-orange-50 text-orange-700',
    title: 'Arabe Dialectal',
    desc: 'Maîtrisez l\'arabe parlé du quotidien. Focus sur le dialecte maghrébin (darija) et levantin pour des échanges naturels en situation réelle.',
    duration: '2 mois',
    sessions: '2 séances / semaine',
    size: '8 étudiants max',
    price: '220 €',
    items: ['Darija marocaine & algérienne', 'Arabe levantin', 'Situations du quotidien', 'Jeux de rôle immersifs'],
  },
  {
    level: 'Tous niveaux',
    badge: 'Intensif',
    badgeColor: 'bg-red-50 text-red-700',
    title: 'Stage Intensif d\'Été',
    desc: 'Progressez rapidement avec notre stage immersif de 4 semaines. 4h de cours par jour pour une montée en compétence fulgurante pendant les vacances.',
    duration: '4 semaines',
    sessions: '5 jours / semaine · 4h/jour',
    size: '6 étudiants max',
    price: '540 €',
    items: ['20h de cours intensifs / semaine', 'Tous niveaux disponibles', 'Matériel pédagogique inclus', 'Certificat de participation'],
  },
];

export default function Programmes() {
  return (
    <div className="bg-white min-h-screen">
      <Nav />

      {/* Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest block mb-5">Nos Formations</span>
            <h1 className="font-arabic text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Des programmes pour <span className="text-emerald-700 italic">chaque niveau.</span>
            </h1>
            <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-2xl">
              Du débutant complet au niveau expert — nos cursus sont conçus pour une progression rapide et durable, avec des groupes réduits et des professeurs certifiés.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programmes Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programmes.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className={`rounded-3xl border flex flex-col overflow-hidden ${p.highlight ? 'border-emerald-200 shadow-2xl shadow-emerald-900/10' : 'border-gray-100 shadow-sm'}`}
              >
                {p.highlight && (
                  <div className="bg-emerald-700 text-white text-center py-2.5 text-[10px] font-black uppercase tracking-widest">
                    ★ Le plus populaire
                  </div>
                )}
                <div className="p-8 flex flex-col flex-1 bg-white">
                  <div className="flex items-start justify-between mb-6">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${p.badgeColor}`}>{p.badge}</span>
                    <span className="text-xs text-gray-400 font-bold">{p.level}</span>
                  </div>
                  <h3 className="font-arabic text-xl font-black text-gray-900 mb-3">{p.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">{p.desc}</p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2 text-xs text-gray-500"><Clock size={13} className="text-emerald-600" />{p.duration}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500"><BookOpen size={13} className="text-emerald-600" />{p.sessions}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500"><Users size={13} className="text-emerald-600" />{p.size}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500"><Award size={13} className="text-emerald-600" />Certifié CECRL</div>
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
                      S'inscrire <ArrowRight size={14} className="inline ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-arabic text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">Questions fréquentes.</h2>
          <div className="flex flex-col gap-6">
            {[
              { q: 'Faut-il des prérequis pour s\'inscrire ?', a: 'Non, nos cours débutant (A1) accueillent des personnes sans aucune connaissance préalable de l\'arabe.' },
              { q: 'Les cours sont-ils en présentiel ou en ligne ?', a: 'Tous nos cours sont en présentiel dans nos locaux à Toulouse (métro Jean Jaurès). Des options hybrides peuvent être envisagées selon les disponibilités.' },
              { q: 'Comment se déroule le test de niveau ?', a: 'Un test de positionnement gratuit est proposé avant toute inscription. Il dure 30 minutes et est réalisé avec un professeur.' },
              { q: 'Les tarifs incluent-ils le matériel pédagogique ?', a: 'Oui, tous les supports de cours (polycopiés, accès à la plateforme numérique) sont inclus dans le tarif.' },
            ].map(({ q, a }) => (
              <div key={q} className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <p className="font-bold text-gray-900 mb-3">{q}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      <Footer />
    </div>
  );
}
