import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Target, Shield, BookOpen } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';

const team = [
  { name: 'Dr. Youssef Al-Amine', role: 'Directeur Pédagogique', bio: 'Docteur en linguistique arabe de l\'Université de Paris. 15 ans d\'enseignement supérieur.', initials: 'YA' },
  { name: 'Mme Fatima Benali', role: 'Professeure Principale', bio: 'Maîtrise en langue et civilisation arabes. Spécialiste de la pédagogie par immersion.', initials: 'FB' },
  { name: 'M. Karim Ouazzani', role: 'Responsable Administratif', bio: 'Expert en gestion d\'instituts de langue. Accompagne les étudiants dans leur parcours depuis 2019.', initials: 'KO' },
];

const values = [
  { icon: Target, title: 'Excellence Académique', desc: 'Nous n\'acceptons aucun compromis sur la qualité de l\'enseignement. Chaque cours est structuré, progressif et évalué.' },
  { icon: Heart, title: 'Bienveillance', desc: 'Un environnement d\'apprentissage chaleureux et encourageant. Ici, on apprend sans jugement.' },
  { icon: Shield, title: 'Rigueur Pédagogique', desc: 'Nos méthodes sont alignées sur les normes européennes CECRL et validées par des spécialistes en linguistique.' },
  { icon: BookOpen, title: 'Tradition & Modernité', desc: 'On marie la richesse de la tradition académique arabe avec des outils numériques de pointe.' },
];

export default function Institut() {
  return (
    <div className="bg-white min-h-screen">
      <Nav />

      {/* Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest block mb-5">L'Institut</span>
            <h1 className="font-arabic text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Notre histoire, <span className="text-emerald-700 italic">notre mission.</span>
            </h1>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              Fondé en 2018 à Toulouse, ISHES est né d'une conviction simple : la langue arabe mérite un enseignement à la hauteur de sa richesse et de son importance dans le monde contemporain.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-arabic text-3xl md:text-4xl font-black text-gray-900 mb-8">Pourquoi ISHES ?</h2>
              <div className="flex flex-col gap-6 text-gray-600 font-medium leading-relaxed">
                <p>L'arabe est la cinquième langue la plus parlée au monde et une clé indispensable pour comprendre des pans entiers de la culture, de la littérature, de la philosophie et de la spiritualité.</p>
                <p>Pourtant, à Toulouse comme ailleurs, les structures d'enseignement sérieux manquaient. ISHES a été créé pour combler ce vide : un institut exigeant, humain et ancré dans la réalité des apprenants.</p>
                <p>En 6 ans, nous avons formé plus de 450 étudiants, de toutes origines et avec des objectifs variés — professionnels, personnels, spirituels. Notre méthode, fondée sur des groupes réduits et un suivi individualisé, a fait ses preuves.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { n: '2018', label: 'Année de fondation' },
                { n: '450+', label: 'Étudiants formés' },
                { n: '98%', label: 'Taux de satisfaction' },
                { n: '5', label: 'Programmes actifs' },
              ].map(({ n, label }) => (
                <div key={label} className="p-8 rounded-3xl bg-gray-50 border border-gray-100 text-center">
                  <p className="text-3xl font-black text-gray-900 mb-2">{n}</p>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-arabic text-3xl md:text-4xl font-black text-gray-900 mb-16 text-center">Nos valeurs.</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-8 md:p-10 rounded-3xl bg-white border border-gray-100 shadow-sm flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-arabic text-3xl md:text-4xl font-black text-gray-900 mb-16 text-center">Notre équipe.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map(({ name, role, bio, initials }) => (
              <div key={name} className="p-8 rounded-3xl bg-gray-50 border border-gray-100 text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-700 text-white flex items-center justify-center text-2xl font-black mx-auto mb-6">{initials}</div>
                <h3 className="font-black text-gray-900 text-lg mb-1">{name}</h3>
                <p className="text-[10px] text-emerald-700 font-black uppercase tracking-widest mb-4">{role}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-arabic text-3xl md:text-4xl font-black text-gray-900 mb-6">Rejoignez l'aventure ISHES.</h2>
          <p className="text-gray-500 mb-10 max-w-xl mx-auto">Découvrez nos programmes et réservez votre place pour la prochaine session.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/inscription" className="btn-primary px-10 py-4 inline-flex items-center gap-2">S'inscrire maintenant <ArrowRight size={16} /></Link>
            <Link to="/contact" className="btn-outline px-10 py-4">Nous contacter</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
