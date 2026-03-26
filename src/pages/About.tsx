import { motion } from 'framer-motion';
import { Star, ShieldCheck, Clock, Heart } from 'lucide-react';

export function About() {
  return (
    <div className="pt-24 pb-20 bg-neutral min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-heading text-dark mb-6 uppercase tracking-wider"
          >
            Notre <span className="text-primary neon-text-primary">Histoire</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-dark/70 max-w-3xl mx-auto font-medium text-xl leading-relaxed"
          >
            Route 66 Ezzahra n'est pas qu'un simple fast-food. C'est une passion pour le goût authentique,
            un engagement envers la qualité, et le désir de vous offrir la meilleure expérience culinaire américaine.
          </motion.p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl -z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200"
              alt="Restaurant Interior"
              className="rounded-2xl shadow-2xl object-cover w-full h-[500px]"
            />
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-xl border border-dark/5 hidden md:block">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
                  <Star className="w-8 h-8 text-accent" fill="currentColor" />
                </div>
                <div>
                  <p className="font-heading text-3xl text-dark">Depuis</p>
                  <p className="text-primary font-bold text-xl">Le premier jour</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-heading text-dark uppercase tracking-wide">
              L'Esprit <span className="text-primary">Diner Américain</span>
            </h2>
            <div className="space-y-6 text-dark/80 text-lg leading-relaxed">
              <p>
                Inspirés par les légendaires "diners" bordant la mythique Route 66, nous avons voulu recréer
                cette atmosphère chaleureuse et généreuse ici, à Ezzahra. Notre objectif : vous faire voyager
                à travers des saveurs authentiques et des portions qui ne vous laisseront pas sur votre faim.
              </p>
              <p>
                Nous savons que la confiance se gagne assiette après assiette. C'est pourquoi nous avons
                récemment repensé notre approche, en mettant l'accent sur la sélection rigoureuse de nos
                ingrédients et l'amélioration continue de notre service.
              </p>
              <p className="font-medium text-dark border-l-4 border-primary pl-4 italic">
                "Chaque burger, chaque pizza, chaque sandwich est préparé avec l'exigence que vous méritez."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-3xl p-12 shadow-xl border border-dark/5">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark uppercase tracking-wide mb-4">
              Nos <span className="text-accent neon-text-accent">Engagements</span>
            </h2>
            <p className="text-dark/60 max-w-2xl mx-auto">
              Ce qui nous anime au quotidien pour vous satisfaire.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <ShieldCheck className="w-12 h-12 text-primary" />,
                title: "Qualité Premium",
                desc: "Des ingrédients frais, sélectionnés avec soin. Une viande de qualité et des légumes du marché pour un goût incomparable."
              },
              {
                icon: <Clock className="w-12 h-12 text-accent" />,
                title: "Service Rapide",
                desc: "Votre temps est précieux. Nous nous engageons à préparer et livrer vos commandes dans les meilleurs délais, sans compromis sur la qualité."
              },
              {
                icon: <Heart className="w-12 h-12 text-primary" />,
                title: "Passion du Goût",
                desc: "Nos recettes sont élaborées avec passion pour vous offrir une expérience gustative généreuse et mémorable à chaque bouchée."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center group"
              >
                <div className="w-24 h-24 mx-auto bg-neutral rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-heading text-dark mb-4">{value.title}</h3>
                <p className="text-dark/70 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
