import React, { useState, useEffect } from 'react';
import { getOrdersFromBlob, OrderData } from '../lib/blobService';
import { Lock, RefreshCw, Package, Truck, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Root66.159753.') {
      setIsAuthenticated(true);
      setError('');
      fetchOrders();
    } else {
      setError('Mot de passe incorrect');
    }
  };

  const fetchOrders = async () => {
    setIsLoading(true);
    setFetchError('');
    try {
      const fetchedOrders = await getOrdersFromBlob();
      setOrders(fetchedOrders);
    } catch (err) {
      setFetchError('Erreur lors du chargement des commandes');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-dark/5"
        >
          <div className="flex justify-center mb-6 text-primary">
            <Lock className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-heading text-center text-dark mb-8">Accès Administrateur</h2>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-dark/80">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-dark/20 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-shadow bg-neutral/50"
                placeholder="••••••••••••"
                required
              />
            </div>
            
            {error && (
              <div className="flex items-center text-primary text-sm bg-primary/5 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-dark text-white font-heading text-xl tracking-wider rounded-sm hover:bg-black transition-all"
            >
              Connexion
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral pt-8 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-dark/5 gap-4">
          <div>
            <h1 className="text-4xl font-heading text-dark">Tableau de Bord</h1>
            <p className="text-dark/60 mt-1">Gérez vos commandes reçues</p>
          </div>
          <button
            onClick={fetchOrders}
            disabled={isLoading}
            className="flex items-center px-6 py-3 bg-primary/10 text-primary font-medium rounded-xl hover:bg-primary hover:text-white transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Actualisation...' : 'Actualiser'}
          </button>
        </div>

        {fetchError && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 flex items-center">
            <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0" />
            <p>{fetchError}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.length === 0 && !isLoading ? (
            <div className="col-span-full bg-white p-12 text-center rounded-2xl border border-dark/5 shadow-sm">
              <Package className="w-16 h-16 mx-auto text-dark/20 mb-4" />
              <h3 className="text-xl font-heading text-dark mb-2">Aucune commande pour le moment</h3>
              <p className="text-dark/60">Les nouvelles commandes apparaîtront ici.</p>
            </div>
          ) : (
            orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl p-6 shadow-md border border-dark/5 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-4 border-b border-dark/10 pb-4">
                  <div>
                    <span className="inline-flex items-center px-3 py-1 bg-dark text-white text-xs font-bold rounded-full mb-2">
                      #{order.id.toUpperCase()}
                    </span>
                    <div className="flex items-center text-dark/60 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(order.date).toLocaleString('fr-FR')}
                    </div>
                  </div>
                  <span className={`flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                    order.type === 'delivery' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {order.type === 'delivery' ? <Truck className="w-3 h-3 mr-1" /> : <Package className="w-3 h-3 mr-1" />}
                    {order.type === 'delivery' ? 'Livraison' : 'À emporter'}
                  </span>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg text-dark">{order.customerInfo.name}</h3>
                    <p className="text-dark/70">{order.customerInfo.phone}</p>
                    {order.type === 'delivery' && (
                      <p className="text-sm text-dark/60 mt-1">
                        {order.customerInfo.address}, {order.customerInfo.city}
                      </p>
                    )}
                    {order.customerInfo.instructions && (
                      <p className="text-xs text-primary mt-1 italic">Note: {order.customerInfo.instructions}</p>
                    )}
                  </div>

                  <div className="bg-neutral/50 p-4 rounded-xl">
                    <h4 className="font-medium text-sm mb-2 text-dark/80 border-b border-dark/10 pb-2">Détails de la commande</h4>
                    <ul className="space-y-2 text-sm">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="flex justify-between text-dark/80">
                          <span><span className="font-semibold mr-1">{item.quantity}x</span> {item.name}</span>
                          <span className="font-medium">{(item.price * item.quantity).toFixed(2)} TND</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-dark/10 flex justify-between items-center">
                  <span className="text-dark/60 font-medium text-sm">Total</span>
                  <span className="text-2xl font-bold text-primary">{order.total.toFixed(2)} TND</span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
