import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-dark text-neutral pt-16 pb-8 border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="inline-block group">
              <h2 className="text-4xl font-heading tracking-widest group-hover:neon-text-primary transition-all duration-300">
                ROUTE <span className="text-primary">66</span>
              </h2>
            </Link>
            <p className="text-neutral/70 text-sm leading-relaxed">
              La Route du Goût — Pizzas, Sandwiches & Plats Américains. 
              Nouvelle équipe, ingrédients frais, service rapide. Route 66 revient plus fort.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/people/Route-66-ezzahra/100076124727391/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-heading tracking-wider mb-6 text-accent">Liens Rapides</h3>
            <ul className="space-y-3">
              {['Menu', 'Commander', 'Galerie', 'À Propos', 'Contact'].map((item) => {
                const path = item === 'À Propos' ? 'about' : item === 'Commander' ? 'order' : item.toLowerCase();
                return (
                  <li key={item}>
                    <Link to={`/${path}`} className="text-neutral/70 hover:text-primary transition-colors text-sm flex items-center group">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 opacity-0 -ml-3 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0"></span>
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-heading tracking-wider mb-6 text-accent">Contact</h3>
            <ul className="space-y-4 text-sm text-neutral/70">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-primary shrink-0 mt-0.5" />
                <span>75 Rue Habib Bourguiba,<br />Ezzahra, Tunisie</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-primary shrink-0" />
                <a href="tel:+21621119911" className="hover:text-primary transition-colors">+216 21 119 911</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-primary shrink-0" />
                <a href="mailto:f.foodroute66@gmail.com" className="hover:text-primary transition-colors">f.foodroute66@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xl font-heading tracking-wider mb-6 text-accent">Horaires</h3>
            <ul className="space-y-3 text-sm text-neutral/70">
              <li className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="flex items-center"><Clock className="w-4 h-4 mr-2" /> Lundi - Dimanche</span>
                <span className="font-medium text-white">11:00 - 23:30</span>
              </li>
              <li className="pt-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-primary font-semibold mb-1">Livraison Rapide</p>
                  <p className="text-xs">Gratuite à Ezzahra pour les commandes &gt; 30 TND</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm text-neutral/50 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Route 66 Ezzahra. Tous droits réservés.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Confidentialité</Link>
            <Link to="/terms" className="hover:text-white transition-colors">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
