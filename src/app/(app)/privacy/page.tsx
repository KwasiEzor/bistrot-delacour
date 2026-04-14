'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const PrivacyPolicy = () => {
  return (
    <div className="pt-16 min-h-screen bg-stone-50">
      <section className="py-32 bg-gradient-to-br from-stone-800 to-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Politique de Confidentialité
            </h1>
            <p className="text-xl text-stone-300 max-w-3xl mx-auto">
              Dernière mise à jour : Avril 2025
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-stone">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div>
              <h2 className="font-serif text-3xl font-bold text-stone-900 mb-6">1. Introduction</h2>
              <p className="text-stone-700 leading-relaxed">
                Le Bistrot De La Cour, situé Rue de Dampremy 22, 6000 Charleroi, Belgique, s'engage à protéger
                la vie privée de ses visiteurs et clients. Cette politique de confidentialité explique comment
                nous collectons, utilisons et protégeons vos données personnelles conformément au Règlement
                Général sur la Protection des Données (RGPD) de l'Union européenne.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-stone-900 mb-6">2. Données collectées</h2>
              <p className="text-stone-700 leading-relaxed mb-4">
                Nous collectons les données suivantes :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone-700">
                <li><strong>Réservations :</strong> nom, email, téléphone, date/heure de réservation, nombre de personnes, demandes spéciales</li>
                <li><strong>Formulaire de contact :</strong> nom, email, sujet, message</li>
                <li><strong>Navigation :</strong> cookies strictement nécessaires au fonctionnement du site</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-stone-900 mb-6">3. Finalités du traitement</h2>
              <p className="text-stone-700 leading-relaxed mb-4">
                Vos données sont utilisées pour :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone-700">
                <li>Gérer vos réservations et vous envoyer des confirmations</li>
                <li>Répondre à vos demandes via le formulaire de contact</li>
                <li>Améliorer notre site web et nos services</li>
                <li>Respecter nos obligations légales (conservation des preuves de réservation)</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-stone-900 mb-6">4. Base légale</h2>
              <p className="text-stone-700 leading-relaxed">
                Le traitement de vos données est fondé sur votre consentement (article 6.1.a du RGPD) 
                lorsque vous remplissez nos formulaires, et sur l'exécution de services précontractuels 
                (article 6.1.b du RGPD) pour les réservations.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-stone-900 mb-6">5. Durée de conservation</h2>
              <ul className="list-disc pl-6 space-y-2 text-stone-700">
                <li><strong>Réservations :</strong> 12 mois après la date de réservation</li>
                <li><strong>Messages de contact :</strong> 24 mois après le dernier échange</li>
                <li><strong>Cookies :</strong> 13 mois maximum</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-stone-900 mb-6">6. Vos droits</h2>
              <p className="text-stone-700 leading-relaxed mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone-700">
                <li><strong>Droit d'accès :</strong> obtenir une copie de vos données personnelles</li>
                <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
                <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
                <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
                <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
                <li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
              </ul>
              <p className="text-stone-700 leading-relaxed mt-4">
                Pour exercer ces droits, contactez-nous à{' '}
                <a href="mailto:contact@bistrot-delacour.be" className="text-amber-600 hover:underline">
                  contact@bistrot-delacour.be
                </a>{' '}
                ou par téléphone au 071 59 64 48.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-stone-900 mb-6">7. Cookies</h2>
              <p className="text-stone-700 leading-relaxed">
                Notre site utilise uniquement des cookies strictement nécessaires à son fonctionnement. 
                Nous n'utilisons pas de cookies de suivi, de publicité ou d'analyse de tiers sans votre 
                consentement explicite. Vous pouvez gérer vos préférences de cookies via la bannière 
                affichée lors de votre première visite.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-stone-900 mb-6">8. Partage des données</h2>
              <p className="text-stone-700 leading-relaxed">
                Vos données ne sont ni vendues ni partagées avec des tiers à des fins commerciales. 
                Elles sont uniquement traitées en interne et hébergées sur des serveurs sécurisés.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-stone-900 mb-6">9. Réclamation</h2>
              <p className="text-stone-700 leading-relaxed">
                Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une 
                réclamation auprès de l'Autorité de Protection des Données belge :{' '}
                <a href="https://www.autoriteprotectiondonnees.be" className="text-amber-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  www.autoriteprotectiondonnees.be
                </a>
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-stone-900 mb-6">10. Contact</h2>
              <p className="text-stone-700 leading-relaxed">
                <strong>Bistrot De La Cour</strong><br />
                Rue de Dampremy 22, 6000 Charleroi, Belgique<br />
                Téléphone : 071 59 64 48<br />
                Email :{' '}
                <a href="mailto:contact@bistrot-delacour.be" className="text-amber-600 hover:underline">
                  contact@bistrot-delacour.be
                </a>
              </p>
            </div>
          </motion.div>

          <div className="mt-16 pt-8 border-t border-stone-200 text-center">
            <Link
              href="/"
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicy
