import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export function Contact() {
  return (
    <div className="pt-24 pb-20 bg-neutral min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-heading text-dark mb-4 uppercase tracking-wider">
            Nous <span className="text-primary neon-text-primary">Contacter</span>
          </h1>
          <p className="text-dark/60 max-w-2xl mx-auto font-medium text-lg">
            Une question, une remarque ou une commande spéciale ? N'hésitez pas à nous joindre.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-dark/5">
              <h2 className="text-3xl font-heading text-dark mb-6 border-b border-dark/10 pb-4">Informations</h2>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark text-lg">Adresse</h3>
                    <p className="text-dark/70">75 Rue Habib Bourguiba<br />Ezzahra, Tunisie</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark text-lg">Téléphone</h3>
                    <a href="tel:+21621119911" className="text-dark/70 hover:text-primary transition-colors">+216 21 119 911</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark text-lg">Email</h3>
                    <a href="mailto:f.foodroute66@gmail.com" className="text-dark/70 hover:text-primary transition-colors">f.foodroute66@gmail.com</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark text-lg">Horaires</h3>
                    <p className="text-dark/70">Tous les jours : 11:00 - 23:30</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map Placeholder */}
            <div className="h-80 bg-dark/5 rounded-2xl overflow-hidden shadow-inner relative flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Ezzahra,Tunisia&zoom=14&size=800x400&maptype=roadmap&markers=color:red%7Clabel:R%7C36.7435,10.3089&key=YOUR_API_KEY')] bg-cover bg-center opacity-50 grayscale"></div>
              <div className="relative z-10 text-center p-6 glass-panel rounded-xl">
                <MapPin className="w-10 h-10 text-primary mx-auto mb-2" />
                <h3 className="font-heading text-2xl text-dark">Route 66 Ezzahra</h3>
                <a href="https://maps.google.com/?q=75+Rue+Habib+Bourguiba,+Ezzahra,+Tunisia" target="_blank" rel="noreferrer" className="inline-block mt-4 px-6 py-2 bg-primary text-white font-medium rounded-sm hover:bg-primary-dark transition-colors">
                  Ouvrir dans Google Maps
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-dark/5 space-y-6 h-full flex flex-col">
              <h2 className="text-3xl font-heading text-dark mb-2 border-b border-dark/10 pb-4">Envoyez-nous un message</h2>
              <p className="text-dark/60 mb-6">Nous vous répondrons dans les plus brefs délais.</p>

              <div className="space-y-2">
                <label className="text-sm font-medium text-dark/80">Nom Complet</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-dark/20 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-shadow bg-neutral/50" placeholder="Votre nom" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-dark/80">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-dark/20 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-shadow bg-neutral/50" placeholder="votre@email.com" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-dark/80">Sujet</label>
                <select className="w-full px-4 py-3 rounded-lg border border-dark/20 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-shadow bg-neutral/50">
                  <option>Question générale</option>
                  <option>Réclamation</option>
                  <option>Partenariat / Événement</option>
                  <option>Autre</option>
                </select>
              </div>

              <div className="space-y-2 flex-grow">
                <label className="text-sm font-medium text-dark/80">Message</label>
                <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-dark/20 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-shadow bg-neutral/50 resize-none h-full" placeholder="Comment pouvons-nous vous aider ?"></textarea>
              </div>

              <button
                type="button"
                className="w-full mt-auto py-4 bg-dark text-white font-heading text-xl tracking-wider rounded-sm hover:bg-primary transition-all duration-300 flex items-center justify-center group"
              >
                Envoyer le Message
                <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
