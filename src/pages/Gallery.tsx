import { motion } from 'framer-motion';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1200',
    alt: 'Route 66 Special Pizza',
    span: 'col-span-1 md:col-span-2 row-span-2'
  },
  {
    src: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&q=80&w=800',
    alt: 'Mixte Sandwich',
    span: 'col-span-1 row-span-1'
  },
  {
    src: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800',
    alt: 'Steak Frites',
    span: 'col-span-1 row-span-1'
  },
  {
    src: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800',
    alt: 'Merguez Sandwich',
    span: 'col-span-1 md:col-span-2 row-span-1'
  },
  {
    src: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800',
    alt: 'Margherita Pizza',
    span: 'col-span-1 row-span-1'
  },
  {
    src: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=800',
    alt: 'Pasta Carbonara',
    span: 'col-span-1 row-span-1'
  },
  {
    src: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=800',
    alt: 'Chef preparing pizza',
    span: 'col-span-1 md:col-span-2 row-span-2'
  },
  {
    src: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=800',
    alt: 'Chicken Nuggets',
    span: 'col-span-1 row-span-1'
  },
  {
    src: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&q=80&w=800',
    alt: 'French Fries',
    span: 'col-span-1 row-span-1'
  }
];

export function Gallery() {
  return (
    <div className="pt-24 pb-20 bg-neutral min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-heading text-dark mb-4 uppercase tracking-wider">
            Notre <span className="text-primary neon-text-primary">Galerie</span>
          </h1>
          <p className="text-dark/60 max-w-2xl mx-auto font-medium text-lg">
            Plongez dans l'univers Route 66. Des plats généreux, une ambiance authentique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-heading text-2xl tracking-wider">{img.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
