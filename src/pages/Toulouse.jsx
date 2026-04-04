import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Train, Clock, Wifi, Coffee, ParkingCircle, CheckCircle2, ChevronDown, Car, Bus } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const faqItems = [
  {
    q: "Où se situe exactement l'institut ?",
    a: "L'institut ISHES est situé au 41 Boulevard de Thibaud, 31100 Toulouse. Nous sommes installés dans des locaux modernes et spacieux, parfaitement adaptés à l'apprentissage de la langue arabe et des sciences islamiques."
  },
  {
    q: "Comment se rendre à l'institut en transports en commun ?",
    a: "Vous pouvez nous rejoindre via le réseau Tisséo : Bus L4, 49, 117 ou 50, arrêt 'Thibaud'. L'arrêt se situe à seulement quelques minutes à pied de l'institut."
  },
  {
    q: "Proposez-vous un parking pour les étudiants venant en voiture ?",
    a: "Oui ! C'est l'un des points forts de notre campus. Contrairement au centre-ville, vous trouverez de nombreuses places de stationnement gratuites et sécurisées directement devant l'institut ou dans les rues adjacentes."
  },
  {
    q: "L'institut est-il accessible aux personnes à mobilité réduite ?",
    a: "Absolument. Nos locaux respectent les normes d'accessibilité en vigueur (ERP) et sont situés au rez-de-chaussée pour permettre un accès facile et sans obstacle à tous nos étudiants."
  }
];

function FAQItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-100 last:border-0 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left hover:text-emerald-700 transition-colors"
      >
        <span className="font-bold text-gray-900 pr-8">{item.q}</span>
        <ChevronDown className={`text-emerald-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={20} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p className="pb-6 text-gray-500 leading-relaxed text-sm">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Toulouse() {
  return (
    <div className="bg-white min-h-screen">
      <Nav />

      {/* Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest block mb-5">Le Campus</span>
            <h1 className="font-arabic text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Un espace dédié à <span className="text-emerald-700 italic">votre réussite.</span>
            </h1>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              Découvrez notre campus moderne situé au Boulevard de Thibaud, conçu pour offrir un cadre serein et propice à l'étude.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main info section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="rounded-3xl overflow-hidden h-72 sm:h-96 shadow-2xl border border-gray-100 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=1600"
                  alt="Campus ISHES Toulouse"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden h-40 shadow-md border border-gray-100">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" alt="Salle de cours" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden h-40 shadow-md border border-gray-100">
                  <img src="https://images.unsplash.com/photo-1620912189865-1e8a33da4c5e?auto=format&fit=crop&q=80&w=800" alt="Bureau" className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-3 p-5 rounded-2xl bg-emerald-50 border border-emerald-100 mb-8">
                <MapPin className="text-emerald-700 flex-shrink-0" size={22} />
                <div>
                  <p className="font-black text-gray-900 text-sm">41 Boulevard de Thibaud</p>
                  <p className="text-xs text-gray-500 font-medium">31100 Toulouse — Zone Thibaud</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mb-10">
                {[
                  { icon: Bus, label: 'Transports', detail: 'Bus L4, 49, 117, 58' },
                  { icon: Clock, label: 'Horaires', detail: 'Lu→Sa · 9h – 21h' },
                  { icon: Wifi, label: 'Wi-Fi Fibre', detail: 'Inclus haut débit' },
                  { icon: ParkingCircle, label: 'Parking Gratuit', detail: 'Devant l\'institut' },
                  { icon: Coffee, label: 'Détente', detail: 'Espace café inclus' },
                  { icon: CheckCircle2, label: 'Accessibilité', detail: 'Locaux plain-pied' },
                ].map(({ icon: Icon, label, detail }) => (
                  <div key={label} className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                      <Icon size={18} className="text-emerald-700" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{label}</p>
                      <p className="text-xs text-gray-400 font-medium">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/inscription" className="btn-primary px-10 py-4 inline-flex items-center gap-2 w-full sm:w-auto justify-center">
                Réserver mon rendez-vous
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl h-72 md:h-[450px] bg-gray-100 relative">
            <iframe
              title="Localisation ISHES Toulouse"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2892.42781489065!2d1.3937968766!3d43.55171737912497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aebb1436df95e9%3A0xc33e5c9429712cfb!2s41%20Bd%20de%20Thibaud%2C%2031100%20Toulouse!5e0!3m2!1sfr!2sfr!4v1711910000000!5m2!1sfr!2sfr"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* FAQ Campus section */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest bg-emerald-50 px-5 py-2 rounded-full border border-emerald-100 shadow-sm mb-6 inline-block">Questions Pratiques</span>
            <h2 className="font-arabic text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Accès au <span className="text-emerald-700 italic">Campus.</span></h2>
            <p className="text-gray-500 font-medium leading-relaxed">Retrouvez toutes les informations utiles pour préparer votre visite à l'institut ISHES.</p>
          </div>

          <div className="p-8 md:p-12 rounded-[3.5rem] bg-gray-50 border border-gray-100 shadow-sm">
            <div className="flex flex-col">
              {faqItems.map((item, i) => (
                <FAQItem key={i} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
