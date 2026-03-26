import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { menuData } from '../data/menuData';
import { useStore } from '../store/useStore';

export function Home() {
  const { addToCart } = useStore();
  const popularItems = menuData.filter(item => item.popular).slice(0, 3);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-dark/60 z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=2000"
          >
            <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
          </video>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 md:p-12 rounded-2xl"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading text-neutral mb-4 tracking-wider animate-neon-flicker neon-text-primary">
              ROUTE <span className="text-primary">66</span>
            </h1>
            <p className="text-xl md:text-3xl font-accent text-accent mb-6 italic">
              American Diner & Pizzeria
            </p>
            <p className="text-lg md:text-xl text-neutral/90 mb-10 max-w-2xl mx-auto font-medium">
              Pizzas, Sandwiches, Platters — Livraison Rapide à Ezzahra
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/order"
                className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-heading text-xl tracking-wider rounded-sm hover:bg-primary-dark transition-all duration-300 shadow-[0_0_15px_rgba(196,30,58,0.5)] hover:shadow-[0_0_25px_rgba(196,30,58,0.8)] flex items-center justify-center group"
              >
                Commander en Ligne
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/menu"
                className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white font-heading text-xl tracking-wider rounded-sm hover:bg-white hover:text-dark transition-all duration-300 flex items-center justify-center"
              >
                Voir la Carte
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quality Pledge Section */}
      <section className="py-20 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-heading text-dark mb-6">Notre Promesse Qualité</h2>
              <p className="text-lg text-dark/70 mb-8 font-accent italic text-xl">
                "Nous avons écouté vos retours. Nouvelle équipe, ingrédients frais, service rapide. Route 66 revient plus fort."
              </p>
              <ul className="space-y-4">
                {[
                  'Pâte à pizza fraîche préparée chaque jour',
                  'Viandes 100% certifiées et de premier choix',
                  'Livraison garantie en moins de 45 minutes',
                  'Service client à votre écoute'
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-dark/80 font-medium">
                    <CheckCircle2 className="w-6 h-6 text-primary mr-3 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=1000"
                alt="Chef preparing pizza"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent flex items-end p-8">
                <div className="glass-panel p-4 rounded-lg flex items-center space-x-4">
                  <div className="bg-accent text-dark font-bold text-2xl px-3 py-1 rounded-md">4.2</div>
                  <div>
                    <div className="flex text-accent">
                      {[...Array(4)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                      <Star className="w-4 h-4 fill-current opacity-50" />
                    </div>
                    <p className="text-white text-sm font-medium">Note moyenne en hausse</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Items */}
      <section className="py-20 bg-dark text-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-heading text-primary mb-4 neon-text-primary">Les Favoris Route 66</h2>
            <p className="text-lg text-neutral/70 max-w-2xl mx-auto">Découvrez nos plats les plus commandés, préparés avec passion et livrés chauds.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-neutral text-dark rounded-xl overflow-hidden shadow-xl group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-dark font-bold px-3 py-1 rounded-full text-sm shadow-md">
                    Populaire
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-heading tracking-wide">{item.name}</h3>
                    <span className="text-xl font-bold text-primary">{item.price} TND</span>
                  </div>
                  <p className="text-dark/60 text-sm mb-6 h-10 line-clamp-2">{item.description}</p>
                  <button
                    onClick={() => addToCart({ ...item, quantity: 1 })}
                    className="w-full py-3 bg-dark text-white font-heading tracking-wider rounded-sm hover:bg-primary transition-colors"
                  >
                    Ajouter au Panier
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link
              to="/menu"
              className="inline-flex items-center text-primary font-heading text-xl hover:text-white transition-colors"
            >
              Voir tout le menu <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Delivery Info */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-heading mb-3">Livraison Rapide</h3>
              <p className="text-white/80">Votre commande livrée chaude en 30 à 45 minutes maximum.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-heading mb-3">Zones Couvertes</h3>
              <p className="text-white/80">Ezzahra, Ben Arous et les zones adjacentes. Livraison gratuite &gt; 30 TND.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-6">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-heading mb-3">Service Client</h3>
              <p className="text-white/80">Une question ? Appelez-nous au +216 21 119 911 tous les jours.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
