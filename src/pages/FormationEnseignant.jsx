import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, PhoneCall, GraduationCap, Heart, Users, ArrowRight } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const pillars = [
  {
    title: 'LÉGITIMITÉ',
    desc: 'Une formation structurée, avec une vraie méthodologie pédagogique reconnue.',
    icon: GraduationCap,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  },
  {
    title: 'SPIRITUALITÉ',
    desc: 'Un travail intérieur profond pour incarner les enseignements avec sincérité (Ikhlas).',
    icon: Heart,
    color: 'text-rose-600',
    bg: 'bg-rose-50'
  },
  {
    title: 'ACCOMPAGNEMENT',
    desc: 'Un suivi réel et personnalisé pour te guider dans ton évolution d\'enseignant.',
    icon: Users,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  }
];

export default function FormationEnseignant() {
  return (
    <div className="bg-white min-h-screen">
      <Nav />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-emerald-400 font-black uppercase tracking-[0.3em] text-[10px] mb-6 block"
          >
            Programme Élite ISHES
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-arabic text-4xl md:text-7xl font-black mb-8 leading-[1.1]"
          >
            Et si enseigner avec légitimité <br/> <span className="text-emerald-500 italic">devenait ta mission ?</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-12"
          >
            Une formation complète pour apprendre à transmettre la religion aux enfants et adolescents avec pédagogie, méthode et posture.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <a href="#process" className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all inline-flex items-center gap-3">
              Réserver un appel de sélection <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Difference Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-10 tracking-tight italic uppercase italic">
            Ce qui fait la <span className="text-emerald-600">différence.</span>
          </h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
            Chez ISHES, nous ne formons pas uniquement des techniciens de l'enseignement. Nous formons des personnes capables d'incarner ce qu'elles transmettent.
          </p>
          <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 italic font-medium text-slate-700 text-xl">
            "On ne peut pas transmettre ce que l'on n'a pas."
          </div>
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p, i) => (
              <motion.div 
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group"
              >
                <div className={`${p.bg} ${p.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <p.icon size={30} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4">{p.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <span className="text-emerald-600 font-black uppercase tracking-widest text-[10px] mb-4 block">Évaluation & Sélection</span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
                Le processus <br/> <span className="text-emerald-500 italic">d'inscription.</span>
              </h2>
              <div className="space-y-8">
                {[
                  { step: '01', title: 'Demande en ligne', desc: 'Remplis le formulaire de pré-inscription pour nous faire part de ton projet.' },
                  { step: '02', title: 'Entretien téléphonique', desc: 'Un appel de 20 min pour évaluer ta motivation et tes objectifs.' },
                  { step: '03', title: 'Validation du profil', desc: 'Si ton profil correspond à l\'excellence ISHES, ton inscription est validée.' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-6">
                    <span className="text-3xl font-black text-emerald-200">{item.step}</span>
                    <div>
                      <h4 className="text-lg font-black text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-12 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:bg-emerald-600 transition-all">
                Démarrer ma demande <PhoneCall size={16} />
              </button>
            </div>
            <div className="flex-1 relative">
              <div className="bg-emerald-600 w-full aspect-square rounded-[4rem] rotate-3 absolute inset-0 -z-10 opacity-10"></div>
              <div className="bg-white p-4 rounded-[4rem] shadow-2xl border border-slate-100 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" alt="Enseignement" className="w-full h-full object-cover rounded-[3.5rem]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
