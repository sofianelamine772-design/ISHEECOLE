import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Fatmaa Elbechir",
    role: "Étudiante & Maman",
    comment: "Un institut d’exception. L’Institut ISHES est une véritable référence pour l’apprentissage de l’Islam. J’ai eu la chance de suivre des cours enrichissants, tout comme mes enfants, et nous en sommes entièrement satisfaits. Des professeurs qualifiés et bienveillants. Des enseignements de qualité en Tajwid et sciences islamiques. Je recommande vivement cet institut à toute personne souhaitant approfondir sa foi et améliorer sa récitation du Coran. Une expérience inestimable ! 🙌✨",
    rating: 5
  },
  {
    name: "Perfect Beauty",
    role: "Étudiante en Tajwid",
    comment: "Je tiens à remercier l’institut ISHES qui propose des cours de grande qualité, adaptés aux enfants comme aux adultes. J’ai suivi les cours de Tajwid intensif et d’éducation islamique pour enfants, et j’ai été impressionnée par la qualité de l’enseignement et la bienveillance des professeurs. Le format en ligne est un vrai plus SubhnAllah les cours sont structurés, interactifs et encore plus efficaces que du présentiel. Des professeurs à l’écoute, qui prennent le temps avec chaque élève. Je recommande sans hésitation ! ✨",
    rating: 5
  },
  {
    name: "Zaineb SB",
    role: "Maman d'élève",
    comment: "Nous sommes inscrits mon fils et moi-même à des cours d’arabe et tajwid depuis la rentrée 2023 et nous sommes très heureux de cet institut et de ses méthodes d’apprentissage. Les enseignantes sont à l’écoute et motivantes, nous sommes ravis des progrès obtenus depuis le début des cours. Qu’Allah vous augmente en bénédiction.",
    rating: 5
  },
  {
    name: "Fanny Vincent",
    role: "Parent d'élève",
    comment: "Mes enfants participent aux cours d'éducation islamique et en sont très satisfaits. La prof est vraiment très bien et très pédagogue, elle explique avec des phrases simples et n'hésite pas à leur demander si ils ont des questions. Ils aiment faire les cours à distance. Et ce qui est super pour les parents c'est de pouvoir entendre le cours et de participer au rappel. Je recommande ISHES à 100%.",
    rating: 5
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function Testimonials() {
  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden" id="temoignages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-6"
          >
            <span className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={10} fill="#059669" className="text-emerald-600" />
              ))}
            </span>
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em]">Excellence Reconnue</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-arabic text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight"
          >
            Ce que nos <span className="text-emerald-700 italic">étudiants</span> disent.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-500 text-lg sm:text-xl font-medium leading-relaxed"
          >
            La réussite de nos élèves est notre plus belle récompense. Découvrez leurs témoignages.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="group relative p-8 sm:p-10 rounded-[3rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-1 transition-all duration-500 flex flex-col"
            >
              <div className="absolute top-10 right-10 text-emerald-50 group-hover:text-emerald-100 transition-colors duration-500 pointer-events-none">
                <Quote size={80} strokeWidth={1.5} />
              </div>
              
              <div className="flex gap-1 mb-8">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="#FBBF24" className="text-amber-400" />
                ))}
              </div>

              <div className="relative z-10 flex-grow">
                <p className="text-gray-600 text-lg sm:text-xl leading-relaxed italic font-medium mb-10 group-hover:text-gray-900 transition-colors duration-500">
                  "{testimonial.comment}"
                </p>
              </div>

              <div className="flex items-center gap-5 pt-8 border-t border-gray-50 mt-auto">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-emerald-900/20 group-hover:scale-110 transition-transform duration-500">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="font-arabic text-xl font-black text-gray-900 group-hover:text-emerald-800 transition-colors duration-500">{testimonial.name}</h4>
                  <p className="text-[11px] text-emerald-600 font-bold uppercase tracking-[0.15em]">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Shapes & Ornaments */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-emerald-50/40 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-emerald-50/40 blur-[120px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2" />
    </section>
  );
}
