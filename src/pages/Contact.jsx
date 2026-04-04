import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nom: '', email: '', telephone: '', niveau: '', message: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    // Here you'd connect to a backend or Formspree
    setSent(true);
  };

  return (
    <div className="bg-white min-h-screen">
      <Nav />

      {/* Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-2xl">
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest block mb-5">Contactez-nous</span>
            <h1 className="font-arabic text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Parlons de votre <span className="text-emerald-700 italic">projet.</span>
            </h1>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              Une question sur nos programmes ? Vous souhaitez vous inscrire ou visiter le campus ? Notre équipe vous répond en moins de 24h.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Info block */}
            <div className="flex flex-col gap-6">
              <h2 className="font-black text-gray-900 text-xl mb-2">Nos coordonnées</h2>
              {[
                { icon: MapPin, title: 'Adresse', detail: '12 Rue des Tourneurs\n31000 Toulouse' },
                { icon: Phone, title: 'Téléphone', detail: '+33 5 61 XX XX XX' },
                { icon: Mail, title: 'Email', detail: 'contact@ishes.fr' },
                { icon: Clock, title: 'Horaires d\'ouverture', detail: 'Lundi — Samedi\n9h00 → 20h00' },
              ].map(({ icon: Icon, title, detail }) => (
                <div key={title} className="flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-1">{title}</p>
                    <p className="text-sm text-gray-700 font-medium whitespace-pre-line">{detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-16 rounded-3xl bg-emerald-50 border border-emerald-100"
                >
                  <CheckCircle2 size={56} className="text-emerald-600 mb-6" />
                  <h3 className="font-arabic text-3xl font-black text-gray-900 mb-4">Message envoyé !</h3>
                  <p className="text-gray-500 font-medium">Notre équipe vous contactera dans les 24 heures ouvrées.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Nom complet *</label>
                      <input
                        name="nom" value={form.nom} onChange={handleChange} required
                        placeholder="Prénom Nom"
                        className="px-4 py-3.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Email *</label>
                      <input
                        name="email" type="email" value={form.email} onChange={handleChange} required
                        placeholder="vous@exemple.fr"
                        className="px-4 py-3.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Téléphone</label>
                      <input
                        name="telephone" value={form.telephone} onChange={handleChange}
                        placeholder="+33 6 XX XX XX XX"
                        className="px-4 py-3.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Niveau actuel</label>
                      <select
                        name="niveau" value={form.niveau} onChange={handleChange}
                        className="px-4 py-3.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all bg-white"
                      >
                        <option value="">— Sélectionner —</option>
                        <option>Débutant (A1)</option>
                        <option>Élémentaire (A2)</option>
                        <option>Intermédiaire (B1)</option>
                        <option>Avancé (B2-C1)</option>
                        <option>Expert (C2)</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Message *</label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange} required rows={5}
                      placeholder="Décrivez votre projet, vos objectifs d'apprentissage..."
                      className="px-4 py-3.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary py-4 px-10 self-start inline-flex items-center gap-3 shadow-lg shadow-emerald-900/20"
                  >
                    <Send size={16} /> Envoyer le message
                  </button>
                  <p className="text-xs text-gray-400 font-medium">* Champs obligatoires. Vos données sont traitées avec confidentialité.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
