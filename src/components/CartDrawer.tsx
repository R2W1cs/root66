import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function CartDrawer() {
  const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity } = useStore();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 30 ? 0 : 5;
  const total = subtotal + deliveryFee;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-neutral shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-dark/10">
              <h2 className="text-2xl font-heading tracking-wider flex items-center">
                <ShoppingBag className="w-6 h-6 mr-2 text-primary" />
                Votre Commande
              </h2>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-dark/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-dark/50">
                  <ShoppingBag className="w-16 h-16" />
                  <p className="text-lg">Votre panier est vide</p>
                  <button
                    onClick={closeCart}
                    className="text-primary font-medium hover:underline"
                  >
                    Continuer vos achats
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}-${item.customization}`} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md shadow-sm"
                    />
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-dark">{item.name}</h3>
                          {item.customization && (
                            <p className="text-sm text-dark/60">{item.customization}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-dark/40 hover:text-primary transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center space-x-3 bg-white rounded-full px-2 py-1 shadow-sm border border-dark/5">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1 hover:bg-dark/5 rounded-full transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-dark/5 rounded-full transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-semibold text-primary">{(item.price * item.quantity).toFixed(2)} TND</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-dark/10 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-dark/70">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(2)} TND</span>
                  </div>
                  <div className="flex justify-between text-dark/70">
                    <span>Frais de livraison</span>
                    <span>{deliveryFee === 0 ? 'Gratuit' : `${deliveryFee.toFixed(2)} TND`}</span>
                  </div>
                  {subtotal < 30 && (
                    <p className="text-xs text-primary/80 italic">
                      Livraison gratuite à partir de 30 TND
                    </p>
                  )}
                  <div className="pt-2 border-t border-dark/10 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">{total.toFixed(2)} TND</span>
                  </div>
                </div>
                <Link
                  to="/order"
                  onClick={closeCart}
                  className="w-full block text-center py-4 bg-primary text-white font-heading tracking-wider text-xl rounded-sm hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                >
                  Valider la commande
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
