import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Phone, MapPin, Clock } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { cn } from '../../lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, toggleCart } = useStore();
  const location = useLocation();

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Galerie', path: '/gallery' },
    { name: 'À Propos', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const checkIsOpen = () => {
    const now = new Date();
    // Assuming Tunisia time is UTC+1. For simplicity, using local time.
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = hours + minutes / 60;
    return time >= 11 && time <= 23.5;
  };

  const isOpen = checkIsOpen();

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-dark/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
      )}
    >
      {/* Top Info Bar - Hidden on mobile */}
      <div className="hidden md:flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-neutral/80 mb-2">
        <div className="flex items-center space-x-4">
          <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> 75 Rue Habib Bourguiba, Ezzahra</span>
          <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> 11:00 - 23:30</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className={cn("px-2 py-0.5 rounded-full font-semibold", isOpen ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400")}>
            {isOpen ? 'Ouvert maintenant' : 'Fermé'}
          </span>
          <a href="tel:+21621119911" className="flex items-center hover:text-primary transition-colors">
            <Phone className="w-3 h-3 mr-1" /> +216 21 119 911
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <h1 className="text-3xl md:text-4xl font-heading text-neutral tracking-widest group-hover:neon-text-primary transition-all duration-300">
              ROUTE <span className="text-primary">66</span>
            </h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-sm font-medium uppercase tracking-wider transition-colors hover:text-primary',
                  location.pathname === link.path ? 'text-primary' : 'text-neutral'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link
              to="/order"
              className="hidden md:inline-flex items-center justify-center px-6 py-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-heading tracking-wider transition-all duration-300 rounded-sm hover:neon-border-primary"
            >
              Commander
            </Link>
            
            <button
              onClick={toggleCart}
              className="relative p-2 text-neutral hover:text-primary transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full animate-bounce">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-neutral"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-dark/95 backdrop-blur-md border-t border-white/10 shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'block px-3 py-3 text-base font-medium uppercase tracking-wider',
                  location.pathname === link.path ? 'text-primary bg-white/5' : 'text-neutral hover:text-primary hover:bg-white/5'
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/order"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block mt-4 px-3 py-3 text-center text-base font-heading tracking-wider bg-primary text-white rounded-sm"
            >
              Commander en Ligne
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
