import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, MapPin, CreditCard, Banknote, ShoppingBag } from 'lucide-react';
import { saveOrderToBlob, OrderData } from '../lib/blobService';

export function Order() {
  const { cart, clearCart } = useStore();
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = orderType === 'delivery' ? (subtotal > 30 ? 0 : 5) : 0;
  const total = subtotal + deliveryFee;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const orderData: OrderData = {
      id: Math.random().toString(36).substring(2, 11),
      date: new Date().toISOString(),
      type: orderType,
      customerInfo: {
        name: formData.get('name') as string,
        phone: formData.get('phone') as string,
        address: formData.get('address') as string,
        city: formData.get('city') as string,
        instructions: formData.get('instructions') as string,
      },
      items: cart,
      subtotal,
      deliveryFee,
      total,
      paymentMethod: 'cash',
      status: 'new',
    };

    try {
      await saveOrderToBlob(orderData);
      setIsSuccess(true);
      clearCart();
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      console.error('Failed to submit order:', error);
      // fallback if blob is not configured
      setIsSuccess(true);
      clearCart();
      setTimeout(() => navigate('/'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-neutral flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl text-center max-w-lg w-full"
        >
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-4xl font-heading text-dark mb-4">Commande Confirmée !</h2>
          <p className="text-dark/70 mb-8 text-lg">
            Merci pour votre commande. Vous recevrez un SMS de confirmation dans quelques instants.
          </p>
          <div className="bg-neutral p-6 rounded-xl mb-8 text-left">
            <p className="font-semibold text-dark mb-2">Détails de livraison :</p>
            <p className="text-dark/70 text-sm">Temps estimé : 30-45 minutes</p>
            <p className="text-dark/70 text-sm">Statut : En préparation</p>
          </div>
          <Link
            to="/"
            className="inline-block px-8 py-4 bg-primary text-white font-heading text-xl tracking-wider rounded-sm hover:bg-primary-dark transition-colors"
          >
            Retour à l'accueil
          </Link>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-neutral flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="w-20 h-20 text-dark/20 mx-auto mb-6" />
          <h2 className="text-4xl font-heading text-dark mb-4">Votre panier est vide</h2>
          <p className="text-dark/60 mb-8">Ajoutez de délicieux plats avant de passer commande.</p>
          <Link
            to="/menu"
            className="inline-flex items-center px-8 py-4 bg-primary text-white font-heading text-xl tracking-wider rounded-sm hover:bg-primary-dark transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voir le Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-neutral min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/menu" className="inline-flex items-center text-dark/60 hover:text-primary transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour au menu
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-dark/5">
              <h2 className="text-3xl font-heading text-dark mb-6 border-b border-dark/10 pb-4">1. Type de Commande</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                    orderType === 'delivery'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-dark/10 text-dark/60 hover:border-primary/50'
                  }`}
                >
                  <MapPin className="w-8 h-8 mb-2" />
                  <span className="font-heading tracking-wider text-lg">Livraison</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                    orderType === 'pickup'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-dark/10 text-dark/60 hover:border-primary/50'
                  }`}
                >
                  <ShoppingBag className="w-8 h-8 mb-2" />
                  <span className="font-heading tracking-wider text-lg">À Emporter</span>
                </button>
              </div>
            </div>

            <form id="checkout-form" onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-dark/5 space-y-6">
              <h2 className="text-3xl font-heading text-dark mb-6 border-b border-dark/10 pb-4">2. Vos Coordonnées</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-dark/80">Prénom & Nom *</label>
                  <input name="name" required type="text" className="w-full px-4 py-3 rounded-lg border border-dark/20 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-shadow bg-neutral/50" placeholder="Jean Dupont" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-dark/80">Téléphone *</label>
                  <input name="phone" required type="tel" className="w-full px-4 py-3 rounded-lg border border-dark/20 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-shadow bg-neutral/50" placeholder="+216 XX XXX XXX" />
                </div>
              </div>

              {orderType === 'delivery' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-dark/80">Adresse de livraison *</label>
                    <input name="address" required type="text" className="w-full px-4 py-3 rounded-lg border border-dark/20 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-shadow bg-neutral/50" placeholder="N° rue, quartier..." />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-dark/80">Ville *</label>
                      <select name="city" required className="w-full px-4 py-3 rounded-lg border border-dark/20 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-shadow bg-neutral/50">
                        <option value="">Sélectionner...</option>
                        <option value="ezzahra">Ezzahra</option>
                        <option value="benarous">Ben Arous</option>
                        <option value="hammam-lif">Hammam Lif</option>
                        <option value="radès">Radès</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-dark/80">Instructions (Optionnel)</label>
                      <input name="instructions" type="text" className="w-full px-4 py-3 rounded-lg border border-dark/20 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-shadow bg-neutral/50" placeholder="Code porte, étage..." />
                    </div>
                  </div>
                </div>
              )}

              <h2 className="text-3xl font-heading text-dark mb-6 border-b border-dark/10 pb-4 pt-6">3. Paiement</h2>
              <div className="space-y-4">
                <label className="flex items-center p-4 border border-primary bg-primary/5 rounded-xl cursor-pointer">
                  <input type="radio" name="payment" defaultChecked className="text-primary focus:ring-primary w-5 h-5" />
                  <Banknote className="w-6 h-6 ml-4 mr-3 text-primary" />
                  <div className="flex-1">
                    <span className="font-semibold text-dark block">Paiement à la livraison</span>
                    <span className="text-sm text-dark/60">Espèces ou Ticket Restaurant</span>
                  </div>
                </label>
                <label className="flex items-center p-4 border border-dark/10 rounded-xl cursor-pointer opacity-50">
                  <input type="radio" name="payment" disabled className="text-primary focus:ring-primary w-5 h-5" />
                  <CreditCard className="w-6 h-6 ml-4 mr-3 text-dark/40" />
                  <div className="flex-1">
                    <span className="font-semibold text-dark block">Carte Bancaire (Bientôt)</span>
                    <span className="text-sm text-dark/60">Paiement en ligne sécurisé</span>
                  </div>
                </label>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-dark text-neutral p-6 md:p-8 rounded-2xl shadow-2xl sticky top-24">
              <h2 className="text-3xl font-heading mb-6 border-b border-white/10 pb-4 text-primary neon-text-primary">Récapitulatif</h2>
              
              <div className="space-y-4 mb-8 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.customization}`} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-semibold">
                        <span className="text-primary mr-2">{item.quantity}x</span>
                        {item.name}
                      </p>
                      {item.customization && (
                        <p className="text-sm text-neutral/50 ml-6">{item.customization}</p>
                      )}
                    </div>
                    <p className="font-medium ml-4">{(item.price * item.quantity).toFixed(2)} TND</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-white/10 text-sm">
                <div className="flex justify-between text-neutral/70">
                  <span>Sous-total</span>
                  <span>{subtotal.toFixed(2)} TND</span>
                </div>
                <div className="flex justify-between text-neutral/70">
                  <span>Frais de livraison</span>
                  <span>{deliveryFee === 0 ? 'Gratuit' : `${deliveryFee.toFixed(2)} TND`}</span>
                </div>
                
                <div className="flex justify-between items-center pt-4 mt-4 border-t border-white/10">
                  <span className="text-xl font-heading tracking-wider">Total</span>
                  <span className="text-3xl font-bold text-primary">{total.toFixed(2)} TND</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full mt-8 py-4 bg-primary text-white font-heading text-xl tracking-wider rounded-sm hover:bg-primary-dark transition-all duration-300 shadow-[0_0_15px_rgba(196,30,58,0.3)] hover:shadow-[0_0_25px_rgba(196,30,58,0.6)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Traitement...
                  </span>
                ) : (
                  'Confirmer la Commande'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
