import React from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Star, CheckCircle2, Trophy, 
  GraduationCap, Gift, UserCheck, Baby, BookOpen, Sparkles
} from 'lucide-react';
import { useRef, useEffect } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55 } };

function Counter({ value, duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration, ease: "easeOut" });
    }
  }, [isInView, value, duration, count]);

  return <span ref={ref}><motion.span>{rounded}</motion.span></span>;
}

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="pt-28 pb-16 sm:pt-32 md:pt-48 md:pb-32 bg-white overflow-hidden relative">
        {/* Background Calligraphy */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none">
          <img src="/hero-bg.png" alt="" className="w-full max-w-5xl h-auto object-contain" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative text-center">
          <motion.div {...fadeUp} className="max-w-4xl mx-auto">
            <h1 className="font-arabic text-[2.8rem] sm:text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-[1.1] mb-8">
              L'excellence de{' '}
              <span className="text-emerald-700 italic">la langue arabe</span>
              {' '}à votre portée.
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto mb-12">
              Institut de référence à Toulouse. Pédagogie certifiée CECRL pour une maîtrise complète, du niveau débutant à l'expertise.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link to="/programmes" className="btn-primary px-12 py-5 text-lg shadow-2xl shadow-emerald-900/20 inline-flex items-center justify-center gap-2 w-full sm:w-auto">
                Voir nos cours <ArrowRight size={20} />
              </Link>
              <Link to="/inscription" className="btn-outline px-12 py-5 text-lg inline-flex items-center justify-center w-full sm:w-auto hover:bg-gray-50 transition-colors">
                Pré-inscription
              </Link>
            </div>

            <div className="mt-16 pt-10 border-t border-gray-100 flex flex-wrap items-center justify-center gap-12">
              <div className="text-center group cursor-default">
                <p className="text-3xl font-black text-gray-900 group-hover:text-emerald-700 transition-colors"><Counter value={1300} />+</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mt-2">Étudiants</p>
              </div>
              <div className="text-center group cursor-default">
                <p className="text-3xl font-black text-gray-900 group-hover:text-emerald-700 transition-colors"><Counter value={12} /></p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mt-2">Enseignants</p>
              </div>
              <div className="text-center group cursor-default">
                <p className="text-3xl font-black text-gray-900 group-hover:text-emerald-700 transition-colors"><Counter value={15} /> ans</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mt-2">Expertise</p>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <div className="flex -space-x-3">
                  {[11,22,33,44,55].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/80?u=${i}`} alt="" className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-md" />
                  ))}
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(5)].map((_,j)=><Star key={j} size={12} fill="currentColor"/>)}
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-widest">Rejoignez-nous</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-20 md:py-28 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest bg-white px-5 py-2 rounded-full border border-gray-100 shadow-sm mb-6 inline-block">Notre méthode</span>
            <h2 className="font-arabic text-4xl md:text-5xl font-black text-gray-900 mb-4">Apprentissage <span className="text-emerald-700 italic">supérieur.</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Supports Numériques', desc: 'Portail e-learning disponible 24h/7j avec ressources interactives.' },
              { title: 'Diplômes Certifiés', desc: 'Programmes alignés sur le cadre européen CECRL (A1→C2).' },
              { title: 'Groupes Réduits', desc: '8 étudiants max pour un suivi optimal et une progression rapide.' },
            ].map(({ title, desc }) => (
              <div key={title} className="p-8 md:p-10 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:bg-emerald-700 transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-emerald-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-arabic text-xl font-black text-gray-900 mb-3">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagements / Institut Section */}
      <section className="py-20 md:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest bg-emerald-50 px-5 py-2 rounded-full border border-emerald-100 shadow-sm mb-6 inline-block">Qualité & Engagement</span>
              <h2 className="font-arabic text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-[1.1]">
                Institut des Sciences <br />
                <span className="text-emerald-700 italic text-3xl md:text-4xl">Humaines Et Spirituelles</span>
              </h2>
              
              <div className="space-y-4">
                {[
                  { icon: GraduationCap, text: "Professeurs diplômé(e)s et Ijazas" },
                  { icon: Sparkles, text: "Formation Nour Al Bayan certifiée" },
                  { icon: Gift, text: "Une séance d'essai gratuite *" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-emerald-200 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-emerald-700">
                      <item.icon size={20} />
                    </div>
                    <span className="font-bold text-gray-800 text-sm md:text-base">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-6"
            >
              {[
                { icon: UserCheck, title: "Personnalisé", text: "Enseignement personnalisé adapté à chaque profil d'élève." },
                { icon: Baby, title: "Montessori", text: "Méthode Montessori Arabe dédiée à l'apprentissage des enfants." },
                { icon: BookOpen, title: "Nour Al Bayan", text: "Méthode Nour Al Bayan Tajwid pour une récitation parfaite." },
              ].map((card, i) => (
                <div key={i} className={`p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all ${i === 0 ? 'sm:col-span-2 bg-emerald-700 text-white border-emerald-600' : 'bg-white'}`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${i === 0 ? 'bg-white/10 text-white' : 'bg-emerald-50 text-emerald-700'}`}>
                    <card.icon size={24} />
                  </div>
                  <h3 className={`font-arabic text-xl font-black mb-3 ${i === 0 ? 'text-white' : 'text-gray-900'}`}>{card.title}</h3>
                  <p className={`text-sm leading-relaxed ${i === 0 ? 'text-emerald-50' : 'text-gray-500'}`}>{card.text}</p>
                </div>
              ))}
            </motion.div>
          </div>
          
          <p className="mt-16 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest italic bg-gray-50 py-3 rounded-full border border-gray-100 max-w-2xl mx-auto">
            * Tous les cours (adulte et enfant) suivant les places disponibles
          </p>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="py-24 bg-emerald-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-6 block"
              >
                À propos de l’Institut
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-arabic text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight"
              >
                Nos <span className="text-emerald-400 italic">chiffres clés.</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-emerald-100/70 text-lg font-medium leading-relaxed max-w-xl"
              >
                ISHES s'engage pour l'excellence pédagogique avec une équipe passionnée et un suivi personnalisé pour chaque élève.
              </motion.p>
            </div>
            
            <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-8">
              {[
                { label: 'Élèves scolarisés', value: 1300, suffix: '+' },
                { label: 'Enseignants', value: 12, suffix: '' },
                { label: 'Années d’expérience', value: 15, suffix: '' },
              ].map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem] flex flex-col justify-center items-center text-center lg:items-start lg:text-left group hover:bg-white/10 transition-colors"
                >
                  <p className="text-5xl md:text-6xl font-black text-white mb-2 group-hover:scale-110 transition-transform duration-500">
                    <Counter value={stat.value} />{stat.suffix}
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500 blur-[150px] rounded-full" />
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-emerald-700 rounded-3xl md:rounded-[3.5rem] px-8 py-16 md:px-20 md:py-24 text-center text-white relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-arabic text-4xl sm:text-5xl md:text-6xl font-black mb-8 leading-tight">Prêt à commencer ?</h2>
              <p className="text-lg opacity-80 mb-12 font-medium leading-relaxed">Prochaine session à Toulouse. Places limitées.</p>
              <Link to="/inscription" className="inline-block bg-white text-emerald-700 px-12 py-5 rounded-2xl font-black text-lg shadow-2xl hover:scale-105 transition-transform">Réserver ma place</Link>
            </div>
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 blur-3xl rounded-full pointer-events-none" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
