import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, X, ShoppingBag } from 'lucide-react';
import { menuData, MenuItem } from '../data/menuData';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';

const categories = ['Tous', 'Pizzas', 'Sandwiches', 'Plats', 'Entrées', 'Boissons'];

export function Menu() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const { addToCart } = useStore();

  const filteredMenu = menuData.filter((item) => {
    const matchesCategory = activeCategory === 'Tous' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (item: MenuItem, customization?: string) => {
    addToCart({ ...item, quantity: 1, customization });
    setSelectedItem(null);
  };

  return (
    <div className="pt-24 pb-20 bg-neutral min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-heading text-dark mb-4 uppercase tracking-wider">
            Notre <span className="text-primary neon-text-primary">Carte</span>
          </h1>
          <p className="text-dark/60 max-w-2xl mx-auto font-medium">
            Découvrez nos spécialités américaines, préparées à la commande avec des ingrédients frais.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 sticky top-20 z-30 bg-neutral/95 backdrop-blur-sm py-4 border-b border-dark/10">
          <div className="flex overflow-x-auto pb-2 w-full md:w-auto hide-scrollbar space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'px-5 py-2 rounded-full font-heading tracking-wider whitespace-nowrap transition-all duration-300',
                  activeCategory === category
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-dark/70 hover:bg-dark/5 border border-dark/10'
                )}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Rechercher un plat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-dark/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark/40 w-5 h-5" />
          </div>
        </div>

        {/* Menu Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredMenu.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-dark/5"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                    <span className="text-white font-bold text-xl">{item.price} TND</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}
                      className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-dark transition-colors shadow-lg hover:scale-110"
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>
                  {item.popular && (
                    <div className="absolute top-3 left-3 bg-accent text-dark text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                      Populaire
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-heading tracking-wide text-dark">{item.name}</h3>
                    <span className="text-lg font-bold text-primary md:hidden">{item.price} TND</span>
                  </div>
                  <p className="text-dark/60 text-sm line-clamp-2">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredMenu.length === 0 && (
          <div className="text-center py-20">
            <Filter className="w-16 h-16 mx-auto text-dark/20 mb-4" />
            <h3 className="text-2xl font-heading text-dark/50">Aucun résultat trouvé</h3>
            <p className="text-dark/40 mt-2">Essayez de modifier votre recherche ou catégorie.</p>
          </div>
        )}

        {/* Item Modal */}
        <AnimatePresence>
          {selectedItem && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedItem(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
                >
                  <div className="relative h-64 shrink-0">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="p-6 md:p-8 overflow-y-auto">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-3xl font-heading text-dark">{selectedItem.name}</h2>
                      <span className="text-2xl font-bold text-primary">{selectedItem.price} TND</span>
                    </div>
                    <p className="text-dark/70 mb-8 text-lg">{selectedItem.description}</p>
                    
                    {/* Customization Options (Example for Pizzas) */}
                    {selectedItem.category === 'Pizzas' && (
                      <div className="space-y-6 mb-8">
                        <div>
                          <h4 className="font-heading text-xl mb-3 border-b border-dark/10 pb-2">Taille</h4>
                          <div className="flex gap-4">
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input type="radio" name="size" defaultChecked className="text-primary focus:ring-primary" />
                              <span>Moyenne (Standard)</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input type="radio" name="size" className="text-primary focus:ring-primary" />
                              <span>Grande (+5 TND)</span>
                            </label>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-heading text-xl mb-3 border-b border-dark/10 pb-2">Suppléments</h4>
                          <div className="grid grid-cols-2 gap-3">
                            {['Fromage', 'Champignons', 'Olives', 'Jambon'].map(ext => (
                              <label key={ext} className="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" className="text-primary focus:ring-primary rounded-sm" />
                                <span>{ext} (+2 TND)</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => handleAddToCart(selectedItem)}
                      className="w-full py-4 bg-primary text-white font-heading text-xl tracking-wider rounded-sm hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30 flex items-center justify-center"
                    >
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      Ajouter au Panier — {selectedItem.price} TND
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
