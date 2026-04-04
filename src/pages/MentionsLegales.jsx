import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="font-arabic text-xl font-black text-gray-900 mb-4 pb-3 border-b border-gray-100">{title}</h2>
    <div className="text-gray-600 text-sm leading-relaxed font-medium space-y-3">{children}</div>
  </div>
);

export default function MentionsLegales() {
  return (
    <div className="bg-white min-h-screen">
      <Nav />

      {/* Header */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest block mb-4">Légal</span>
            <h1 className="font-arabic text-4xl sm:text-5xl font-black text-gray-900">Mentions Légales</h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>

            <Section title="Informations légales">
              <p>
                Le site et le nom de domaine <strong className="text-gray-900">www.ishes.fr</strong> sont la propriété de
                <strong className="text-gray-900"> Mr Riad Latreche</strong> et <strong className="text-gray-900">Mme Rachida Latreche</strong>.
              </p>
              <p>
                Le site <strong className="text-gray-900">www.ishes.fr</strong> est optimisé pour les navigateurs de génération récente
                (Mozilla Firefox, MS Explorer, Google Chrome, Safari, Opéra).
              </p>
              <p>
                Le site est hébergé chez l'entreprise <strong className="text-gray-900">OVH</strong> (SIREN 424 761 419),
                domicilié au 2 rue Kellermann, 59100 Roubaix.
              </p>
            </Section>

            <Section title="Propriété intellectuelle">
              <p>
                Le présent site constitue une œuvre dont <strong className="text-gray-900">Institut ISHES</strong> est l'auteur
                au sens des articles L.111.1 et suivants du Code de la propriété intellectuelle.
              </p>
              <p>
                Les photographies, textes, slogans, dessins, images, séquences animées sonores ou non ainsi que toutes œuvres
                intégrées dans le site sont la propriété de Institut ISHES ou de tiers ayant autorisé Institut ISHES à les utiliser.
              </p>
              <p>
                Toute reproduction, représentation, utilisation ou modification mise à part à titre informatif, par quelque
                procédé que ce soit et sur quelque support que ce soit, de tout ou partie du site, de tout ou partie des
                différentes œuvres qui le composent, sans avoir obtenu l'autorisation préalable de Institut ISHES est strictement
                interdite et constitue un délit de contrefaçon.
              </p>
            </Section>

            <Section title="Sites liés">
              <p>
                Institut ISHES autorise tout site Internet ou tout support à mettre en place un lien hypertexte en direction de
                son contenu à l'exception de ceux diffusant des contenus à caractère polémique, pornographique, xénophobe,
                contraire à la décence ou aux bonnes mœurs.
              </p>
              <p>
                Institut ISHES décline toute responsabilité concernant le contenu disponible sur les autres sites Internet vers
                lesquels il a créé des liens ou qui auraient pu être créés à son insu. L'accès à tous les autres sites Internet
                liés à ce site Internet se fait aux risques de l'utilisateur.
              </p>
              <p>
                Institut ISHES décline aussi toute responsabilité pour toutes les informations et matériaux contenus sur des sites
                tiers où figurent des liens renvoyant au site Internet <strong className="text-gray-900">www.ishes.fr</strong>.
              </p>
            </Section>

            <Section title="Caractère des informations dans le site">
              <p>
                Toutes les informations présentes sur ce site Internet n'ont qu'un caractère informatif. Ces informations
                n'engagent pas contractuellement Institut ISHES qui décline toute responsabilité sur les décisions qui pourraient
                être prises à partir de ces informations. Le contenu du site est susceptible de modification sans préavis.
              </p>
            </Section>

            <Section title="Protection des données personnelles">
              <p>
                L'Institut ISHES enregistre informatiquement toutes les données personnelles des formulaires d'inscription pour
                une gestion en interne. Dans le cadre du Règlement Général de la Protection des Données (RGPD), ces informations
                peuvent être consultées, modifiées et supprimées sur demande.
              </p>
              <p>
                Pour toute demande relative à vos données personnelles, contactez-nous à :{' '}
                <a href="mailto:contact@ishes.fr" className="text-emerald-700 font-bold hover:underline">contact@ishes.fr</a>
              </p>
            </Section>

            <Section title="Dysfonctionnement et virus">
              <p>
                Institut ISHES ne pourra pas être tenu responsable de dommages directs ou indirects, pertes ou frais,
                résultant de l'utilisation de ce site Internet, ou de l'impossibilité pour un tiers de l'utiliser, ou
                d'un mauvais fonctionnement, d'une interruption, d'un virus, ou encore d'un problème de ligne ou de système.
              </p>
            </Section>

            <div className="mt-14 pt-8 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400 font-medium mb-6">
                Dernière mise à jour : Mars 2025 — Institut ISHES, 41 Boulevard de Thibaud, 31100 Toulouse
              </p>
              <Link to="/" className="btn-primary px-10 py-4 inline-flex items-center gap-2">
                Retour à l'accueil
              </Link>
            </div>

          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
