import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, BookOpen, ExternalLink } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const books = [
  {
    title: "LA CHAHADA, le chemin de son cœur",
    subtitle: "Histoires et morales pour comprendre LÂ ILÂHA ILLA ALLAH",
    desc: "Donnez du sens à votre foi à travers des histoires vraies et morales inspirantes pour vous aider à vous connecter à ALLAH ﷻ.",
    amazonUrl: "https://www.amazon.fr/s?k=rachida+reziga", // Lien générique à défaut d'ASIN spécifique fourni
    img: "/assets/boutique/61GTzu1YfIL._SY342_.jpg"
  },
  {
    title: "Mohammed ﷺ le Messager d'ALLAH ﷻ",
    subtitle: "Une biographie accessible pour découvrir sa noble vie",
    desc: "Cette étape propose de découvrir la seconde partie de l’attestation de foi : MOHAMMAD ﷺ Le Messager d’ALLAHﷻ, par l’étude de la Sîrah du Prophète ﷺ.",
    amazonUrl: "https://www.amazon.fr/Mohammed-Messager-dALLAH-accessible-d%C3%A9couvrir/dp/B0GDF23MZZ/",
    img: "/assets/boutique/livre_sirah.png"
  },
  {
    title: "Mon Ramadan Planner",
    subtitle: "Pour Enfants : 30 jours de suivi quotidien",
    desc: "De bonnes actions (Coran, prière, dhikr, dou'a...) et de bilans pour mieux comprendre et réussir son Ramadan.",
    amazonUrl: "https://www.amazon.fr/Mon-Ramadan-Planner-Pour-Enfants/dp/B0GCZZKF3W/",
    img: "/assets/boutique/livre_ramadan.png"
  },
  {
    title: "Carnet d’invocation",
    subtitle: "Votre compagnon d’apprentissage au quotidien",
    desc: "Conçu avec des invocations en arabe, phonétique et traduction française pour vous accompagner chaque jour.",
    amazonUrl: "https://www.amazon.fr/Carnet-dinvocation-Tableau-suivi-dapprentissage/dp/B0G6WRKNFV/",
    img: "/assets/boutique/livre_invocation.jpg"
  }
];

export default function Boutique() {
  return (
    <div className="bg-white min-h-screen">
      <Nav />

      {/* Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest block mb-5">Notre Librairie</span>
            <h1 className="font-arabic text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Des supports pour <span className="text-emerald-700 italic">votre foi.</span>
            </h1>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              Découvrez notre sélection de livres et supports pédagogiques conçus pour accompagner petits et grands dans leur cheminement spirituel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-16 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {books.map((book, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col sm:flex-row gap-8 p-6 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500"
              >
                <div className="w-full sm:w-48 h-72 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-500 bg-gray-50 border border-gray-100">
                  <img src={book.img} alt={book.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <h3 className="font-arabic text-2xl font-black text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">{book.title}</h3>
                  <p className="text-sm font-bold text-emerald-600 mb-4 uppercase tracking-wide">{book.subtitle}</p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">{book.desc}</p>
                  
                  <div className="mt-auto">
                    <a 
                      href={book.amazonUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-emerald-700 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg shadow-emerald-900/20 hover:bg-emerald-800 transition-all hover:scale-105"
                    >
                      Acheter en ligne <ShoppingBag size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections CTA */}
      <section className="py-16 md:py-24 bg-emerald-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10 text-white">
          <h2 className="font-arabic text-3xl md:text-4xl font-black mb-6">Soutenez l'Institut.</h2>
          <p className="text-emerald-100/70 mb-10 max-w-xl mx-auto">Chaque achat nous aide à financer nos activités et à proposer un enseignement de qualité à tous.</p>
          <a href="https://www.amazon.fr/s?k=rachida+reziga" target="_blank" rel="noopener noreferrer" className="btn-primary bg-white text-emerald-900 px-10 py-4 hover:bg-emerald-50">
            Voir toute la collection <ExternalLink size={16} className="ml-2" />
          </a>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 flex justify-center items-center">
            <BookOpen size={400} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
