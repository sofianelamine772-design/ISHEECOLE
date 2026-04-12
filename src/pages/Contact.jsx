import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <div className="bg-white min-h-screen">
      <Nav />

      {/* Header */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto">
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest block mb-5">Nous Contacter</span>
            <h1 className="font-arabic text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Parlons de votre <span className="text-emerald-700 italic">projet.</span>
            </h1>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              Une question sur nos programmes ? Vous souhaitez nous rendre visite ? <br className="hidden md:block" /> 
              Notre équipe est disponible pour vous accompagner dans votre apprentissage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MapPin, title: 'Adresse', detail: '41 Boulevard de Thibaud\n31100 Toulouse' },
              { icon: Phone, title: 'Téléphone', detail: '+33 7 68 65 20 91\n+33 6 66 03 35 19' },
              { icon: Mail, title: 'Email', detail: 'contact@ishes.fr' },
              { icon: Clock, title: 'Horaires', detail: 'Lundi — Samedi\n9h00 → 20h00' },
            ].map(({ icon: Icon, title, detail }) => (
              <motion.div 
                key={title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:shadow-xl hover:shadow-emerald-900/5 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon size={24} className="text-emerald-700" />
                </div>
                <h3 className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em] mb-3">{title}</h3>
                <p className="text-sm text-gray-700 font-bold leading-relaxed whitespace-pre-line">{detail}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a 
              href="https://wa.me/33768652091" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-900/20 transition-all hover:-translate-y-1"
            >
              <MessageSquare size={18} /> Nous écrire sur WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
