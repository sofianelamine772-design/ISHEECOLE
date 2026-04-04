import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, User, Mail, Phone, BookOpen, MessageSquare } from 'lucide-react';
import { useInscription } from '../context/InscriptionContext';

export default function InscriptionModal() {
  const { isOpen, closeInscription } = useInscription();
  const [step, setStep] = useState(1); // 1 = form, 2 = success
  const [form, setForm] = useState({
    prenom: '', nom: '', email: '', telephone: '',
    niveau: '', programme: '', objectif: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setStep(2);
  };

  const handleClose = () => {
    closeInscription();
    setTimeout(() => { setStep(1); setForm({ prenom: '', nom: '', email: '', telephone: '', niveau: '', programme: '', objectif: '' }); }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="relative bg-emerald-700 rounded-t-3xl px-8 pt-10 pb-8 text-white overflow-hidden">
                <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X size={18} />
                </button>
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-200 mb-2">ISHES · Toulouse</p>
                <h2 className="font-arabic text-3xl font-black leading-tight">Formulaire d'inscription</h2>
                <p className="text-emerald-100 text-sm mt-2 font-medium">Remplissez ce formulaire et notre équipe vous contactera sous 24h.</p>
              </div>

              {/* Content */}
              <div className="px-8 py-8">
                {step === 1 ? (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Nom & Prénom */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5"><User size={10} />Prénom *</label>
                        <input
                          name="prenom" value={form.prenom} onChange={handleChange} required
                          placeholder="Mohamed"
                          className="px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5"><User size={10} />Nom *</label>
                        <input
                          name="nom" value={form.nom} onChange={handleChange} required
                          placeholder="Dupont"
                          className="px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5"><Mail size={10} />Email *</label>
                      <input
                        name="email" type="email" value={form.email} onChange={handleChange} required
                        placeholder="vous@exemple.fr"
                        className="px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
                      />
                    </div>

                    {/* Téléphone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5"><Phone size={10} />Téléphone *</label>
                      <input
                        name="telephone" value={form.telephone} onChange={handleChange} required
                        placeholder="+33 6 XX XX XX XX"
                        className="px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
                      />
                    </div>

                    {/* Niveau & Programme */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5"><BookOpen size={10} />Niveau actuel *</label>
                        <select
                          name="niveau" value={form.niveau} onChange={handleChange} required
                          className="px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all bg-white"
                        >
                          <option value="">Sélectionner</option>
                          <option>Débutant (A1)</option>
                          <option>Élémentaire (A2)</option>
                          <option>Intermédiaire (B1)</option>
                          <option>Avancé (B2-C1)</option>
                          <option>Expert (C2)</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Programme *</label>
                        <select
                          name="programme" value={form.programme} onChange={handleChange} required
                          className="px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all bg-white"
                        >
                          <option value="">Sélectionner</option>
                          <option>Arabe Littéraire</option>
                          <option>Arabe Dialectal</option>
                          <option>Stage Intensif</option>
                          <option>Je ne sais pas encore</option>
                        </select>
                      </div>
                    </div>

                    {/* Objectif */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5"><MessageSquare size={10} />Votre objectif (optionnel)</label>
                      <textarea
                        name="objectif" value={form.objectif} onChange={handleChange} rows={3}
                        placeholder="Ex : Lire le Coran, voyage, raisons professionnelles..."
                        className="px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-emerald-700 text-white py-4 rounded-2xl font-black text-base flex items-center justify-center gap-3 shadow-lg shadow-emerald-900/20 hover:bg-emerald-800 transition-colors mt-2"
                    >
                      <Send size={16} /> Envoyer ma demande
                    </button>
                    <p className="text-center text-xs text-gray-400">* Champs obligatoires · Réponse sous 24h ouvrées</p>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-10 gap-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center">
                      <CheckCircle2 size={40} className="text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-arabic text-2xl font-black text-gray-900 mb-3">Demande envoyée !</h3>
                      <p className="text-gray-500 font-medium leading-relaxed max-w-sm">
                        Merci <strong>{form.prenom}</strong> ! Notre équipe vous contactera à l'adresse <strong>{form.email}</strong> dans les 24 heures.
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="bg-emerald-700 text-white px-10 py-4 rounded-2xl font-black hover:bg-emerald-800 transition-colors"
                    >
                      Fermer
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
