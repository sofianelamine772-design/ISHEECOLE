import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Phone, BookOpen, ChevronRight, ChevronLeft,
  CheckCircle2, CreditCard, Lock, Shield, ArrowRight
} from 'lucide-react';
import Nav from '../components/Nav';

// ─── Prix par programme ──────────────────────────────────────────────────────
const programmes = [
  { id: 'litteraire-a1', label: 'Arabe Littéraire — Initiation (A1-A2)', price: 290, duration: '3 mois · 2 séances/sem' },
  { id: 'litteraire-b1', label: 'Arabe Littéraire — Consolidation (B1-B2)', price: 360, duration: '4 mois · 2 séances/sem', popular: true },
  { id: 'litteraire-c1', label: 'Arabe Littéraire — Maîtrise (C1-C2)', price: 490, duration: '6 mois · 3 séances/sem' },
  { id: 'dialectal', label: 'Arabe Dialectal', price: 220, duration: '2 mois · 2 séances/sem' },
  { id: 'intensif', label: 'Stage Intensif d\'Été', price: 540, duration: '4 semaines · 4h/jour' },
];

// ─── Step Indicator ──────────────────────────────────────────────────────────
const StepIndicator = ({ current }) => {
  const steps = ['Vos infos', 'Programme', 'Paiement'];
  return (
    <div className="flex items-center gap-0 mb-12">
      {steps.map((label, i) => {
        const idx = i + 1;
        const done = current > idx;
        const active = current === idx;
        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm transition-all duration-300
                ${done ? 'bg-emerald-600 text-white' : active ? 'bg-emerald-700 text-white ring-4 ring-emerald-100' : 'bg-gray-100 text-gray-400'}`}>
                {done ? <CheckCircle2 size={18} /> : idx}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${active ? 'text-emerald-700' : done ? 'text-emerald-500' : 'text-gray-300'}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mb-5 mx-2 transition-all duration-500 ${done ? 'bg-emerald-400' : 'bg-gray-100'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ─── Step 1 : Informations personnelles ─────────────────────────────────────
const Step1 = ({ data, onChange, onNext }) => {
  const valid = data.prenom && data.nom && data.email && data.telephone;
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
      <h2 className="font-arabic text-2xl font-black text-gray-900 mb-8">Vos informations</h2>
      <div className="flex flex-col gap-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field icon={<User size={14}/>} label="Prénom *" name="prenom" value={data.prenom} onChange={onChange} placeholder="Mohamed" />
          <Field icon={<User size={14}/>} label="Nom *" name="nom" value={data.nom} onChange={onChange} placeholder="Dupont" />
        </div>
        <Field icon={<Mail size={14}/>} label="Adresse email *" name="email" type="email" value={data.email} onChange={onChange} placeholder="vous@exemple.fr" />
        <Field icon={<Phone size={14}/>} label="Téléphone *" name="telephone" value={data.telephone} onChange={onChange} placeholder="+33 6 XX XX XX XX" />
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5"><BookOpen size={12} /> Niveau actuel</label>
          <select name="niveau" value={data.niveau} onChange={onChange}
            className="px-4 py-3.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all bg-white">
            <option value="">— Sélectionner votre niveau —</option>
            <option>Débutant complet (A1)</option>
            <option>Élémentaire (A2)</option>
            <option>Intermédiaire (B1)</option>
            <option>Avancé (B2-C1)</option>
            <option>Expert (C2)</option>
          </select>
        </div>
      </div>
      <button onClick={onNext} disabled={!valid}
        className="mt-8 w-full bg-emerald-700 text-white py-4 rounded-2xl font-black text-base flex items-center justify-center gap-3 shadow-lg shadow-emerald-900/15 hover:bg-emerald-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
        Continuer <ChevronRight size={18} />
      </button>
    </motion.div>
  );
};

// ─── Step 2 : Choix du programme ─────────────────────────────────────────────
const Step2 = ({ data, onChange, onNext, onBack }) => (
  <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
    <h2 className="font-arabic text-2xl font-black text-gray-900 mb-8">Choisissez votre programme</h2>
    <div className="flex flex-col gap-3 mb-8">
      {programmes.map(p => (
        <label key={p.id} className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all
          ${data.programme === p.id ? 'border-emerald-600 bg-emerald-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
          <div className="flex items-center gap-4">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
              ${data.programme === p.id ? 'border-emerald-600 bg-emerald-600' : 'border-gray-300'}`}>
              {data.programme === p.id && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-gray-900 text-sm">{p.label}</p>
                {p.popular && <span className="text-[9px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Populaire</span>}
              </div>
              <p className="text-xs text-gray-400 font-medium mt-0.5">{p.duration}</p>
            </div>
          </div>
          <div className="text-right flex-shrink-0 ml-4">
            <p className="font-black text-gray-900">{p.price} €</p>
            <p className="text-[10px] text-gray-400 font-medium">/ session</p>
          </div>
          <input type="radio" name="programme" value={p.id} checked={data.programme === p.id}
            onChange={onChange} className="hidden" />
        </label>
      ))}
    </div>
    <div className="flex gap-4">
      <button onClick={onBack} className="flex-1 py-4 rounded-2xl border-2 border-gray-200 font-black text-gray-600 flex items-center justify-center gap-2 hover:border-gray-300 transition-all">
        <ChevronLeft size={18} /> Retour
      </button>
      <button onClick={onNext} disabled={!data.programme}
        className="flex-1 bg-emerald-700 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/15 hover:bg-emerald-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
        Passer au paiement <ChevronRight size={18} />
      </button>
    </div>
  </motion.div>
);

// ─── Step 3 : Paiement Stripe ────────────────────────────────────────────────
const Step3 = ({ data, onBack, onSuccess }) => {
  const selected = programmes.find(p => p.id === data.programme);
  const [paying, setPaying] = useState(false);
  const [cardData, setCardData] = useState({ numero: '', expiry: '', cvc: '', titulaire: '' });

  const formatCard = val => val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  const formatExpiry = val => val.replace(/\D/g, '').replace(/^(\d{2})(\d)/, '$1/$2').slice(0, 5);

  const handlePay = async (e) => {
    e.preventDefault();
    setPaying(true);
    setTimeout(() => { setPaying(false); onSuccess(); }, 2000); // Simulated for now
  };

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
      <h2 className="font-arabic text-2xl font-black text-gray-900 mb-2">Paiement sécurisé</h2>
      <p className="text-sm text-gray-400 font-medium mb-8">Vos données sont chiffrées et sécurisées par Stripe.</p>

      {/* Guide Mascotte Section */}
      <div className="mb-10 flex flex-col items-center">
        <motion.div 
          animate={{ y: [0, -10, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <img src="/mascotte-ville.png" alt="Guide ISHES" className="w-48 h-auto drop-shadow-2xl" />
        </motion.div>
        
        {/* Speech Bubble */}
        <div className="relative mt-[-20px] bg-emerald-700 text-white p-6 rounded-[2rem] shadow-xl text-center max-w-sm">
          <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[15px] border-b-emerald-700"></div>
          
          <p className="text-sm font-bold leading-relaxed">
            "Une fois que vous avez payé, vous pourrez vous connecter instantanément à votre espace élève sur <span className="underline decoration-emerald-400 underline-offset-4 tracking-tighter">ISHEECOLE</span> en utilisant l'adresse mail indiquée précédemment !"
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 opacity-60">
            <Mail size={12} />
            <span className="text-[10px] font-black uppercase tracking-widest">{data.email}</span>
          </div>
        </div>
      </div>

      {/* Order summary */}
      <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Dernière étape</p>
            <p className="font-bold text-gray-900 text-sm">{selected?.label}</p>
            <p className="text-xs text-gray-500 mt-0.5">{selected?.duration}</p>
            <p className="font-medium text-sm text-gray-600 mt-1">Élève : {data.prenom} {data.nom}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black text-gray-900">{selected?.price} €</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase">TTC</p>
          </div>
        </div>
      </div>

      {/* Card form */}
      <form onSubmit={handlePay} className="flex flex-col gap-4">
        <Field
          icon={<User size={14}/>} label="Titulaire de la carte"
          name="titulaire" value={cardData.titulaire}
          onChange={e => setCardData({ ...cardData, titulaire: e.target.value })}
          placeholder="NOM PRÉNOM (comme sur la carte)"
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
            <CreditCard size={12} /> Numéro de carte
          </label>
          <input
            value={cardData.numero} onChange={e => setCardData({ ...cardData, numero: formatCard(e.target.value) })}
            placeholder="1234 5678 9012 3456" maxLength={19}
            className="px-4 py-3.5 rounded-xl border border-gray-200 text-sm font-mono font-medium text-gray-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all tracking-widest"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Expiration</label>
            <input
              value={cardData.expiry} onChange={e => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
              placeholder="MM/AA" maxLength={5}
              className="px-4 py-3.5 rounded-xl border border-gray-200 text-sm font-mono font-medium text-gray-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all tracking-widest"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">CVC</label>
            <input
              value={cardData.cvc} onChange={e => setCardData({ ...cardData, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })}
              placeholder="XXX"
              className="px-4 py-3.5 rounded-xl border border-gray-200 text-sm font-mono font-medium text-gray-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all tracking-widest"
            />
          </div>
        </div>

        {/* Security badges */}
        <div className="flex items-center justify-center gap-6 py-3">
          <div className="flex items-center gap-1.5 text-gray-400"><Lock size={12} /><span className="text-[10px] font-bold">SSL 256-bit</span></div>
          <div className="flex items-center gap-1.5 text-gray-400"><Shield size={12} /><span className="text-[10px] font-bold">Stripe Secure</span></div>
        </div>

        <div className="flex gap-4 mt-2">
          <button type="button" onClick={onBack} className="flex-1 py-4 rounded-2xl border-2 border-gray-200 font-black text-gray-600 flex items-center justify-center gap-2 hover:border-gray-300 transition-all">
            <ChevronLeft size={18} /> Retour
          </button>
          <button type="submit" disabled={paying}
            className="flex-2 flex-grow-[2] bg-emerald-700 text-white py-4 px-8 rounded-2xl font-black flex items-center justify-center gap-3 shadow-lg shadow-emerald-900/15 hover:bg-emerald-800 transition-all disabled:opacity-60">
            {paying ? (
              <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Traitement…</>
            ) : (
              <><Lock size={16} /> Payer {selected?.price} €</>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

// ─── Success ──────────────────────────────────────────────────────────────────
const Success = ({ data }) => {
  const selected = programmes.find(p => p.id === data.programme);
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
      <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-8">
        <CheckCircle2 size={48} className="text-emerald-600" />
      </div>
      <h2 className="font-arabic text-3xl font-black text-gray-900 mb-4">Inscription confirmée !</h2>
      <p className="text-gray-500 font-medium leading-relaxed mb-2">
        Bienvenue <strong className="text-gray-900">{data.prenom} {data.nom}</strong> !
      </p>
      <p className="text-gray-500 font-medium leading-relaxed mb-8">
        Un email de confirmation a été envoyé à <strong className="text-gray-900">{data.email}</strong>.<br />
        Notre équipe vous contactera sous 24h pour organiser votre première séance de <strong>{selected?.label}</strong>.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/" className="btn-primary px-10 py-4 inline-flex items-center gap-2">Retour à l'accueil <ArrowRight size={16} /></Link>
        <Link to="/programmes" className="btn-outline px-10 py-4">Voir nos programmes</Link>
      </div>
    </motion.div>
  );
};

// ─── Helper Field ─────────────────────────────────────────────────────────────
const Field = ({ icon, label, name, type = 'text', value, onChange, placeholder }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5">{icon}{label}</label>
    <input
      name={name} type={type} value={value} onChange={onChange}
      placeholder={placeholder}
      className="px-4 py-3.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all"
    />
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Inscription() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    prenom: '', nom: '', email: '', telephone: '', niveau: '', programme: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="bg-gray-50 min-h-screen">
      <Nav />

      <div className="pt-28 pb-20 md:pt-36">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">

          {/* Top label */}
          {!done && (
            <div className="text-center mb-10">
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest bg-white px-5 py-2 rounded-full border border-gray-100 shadow-sm inline-block">
                ISHES · Inscription en ligne
              </span>
              <h1 className="font-arabic text-3xl sm:text-4xl font-black text-gray-900 mt-5">
                Rejoignez l'institut.
              </h1>
            </div>
          )}

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 p-8 md:p-12">
            {!done ? (
              <>
                <StepIndicator current={step} />
                <AnimatePresence mode="wait">
                  {step === 1 && <Step1 key="s1" data={form} onChange={handleChange} onNext={() => setStep(2)} />}
                  {step === 2 && <Step2 key="s2" data={form} onChange={handleChange} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
                  {step === 3 && <Step3 key="s3" data={form} onBack={() => setStep(2)} onSuccess={() => setDone(true)} />}
                </AnimatePresence>
              </>
            ) : (
              <Success data={form} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
