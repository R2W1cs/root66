export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Pizzas' | 'Sandwiches' | 'Plats' | 'Entrées' | 'Boissons';
  image: string;
  popular?: boolean;
};

export const menuData: MenuItem[] = [
  {
    id: 'p1',
    name: 'Margherita',
    description: 'Sauce tomate, mozzarella, basilic frais',
    price: 15,
    category: 'Pizzas',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'p2',
    name: 'Pepperoni',
    description: 'Sauce tomate, mozzarella, pepperoni américain',
    price: 18,
    category: 'Pizzas',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800',
    popular: true,
  },
  {
    id: 'p3',
    name: 'Route 66 Spéciale',
    description: 'Sauce tomate, mozzarella, viande hachée, poivrons, oignons, champignons, olives',
    price: 22,
    category: 'Pizzas',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
    popular: true,
  },
  {
    id: 's1',
    name: 'Escalope Panée',
    description: 'Escalope de poulet panée, frites, salade, sauce au choix',
    price: 10,
    category: 'Sandwiches',
    image: 'https://images.unsplash.com/photo-1619881589316-56c7f9e6b587?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 's2',
    name: 'Merguez',
    description: 'Merguez grillées, frites, salade, harissa',
    price: 8,
    category: 'Sandwiches',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 's3',
    name: 'Mixte',
    description: 'Poulet, viande hachée, fromage, frites, salade',
    price: 12,
    category: 'Sandwiches',
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&q=80&w=800',
    popular: true,
  },
  {
    id: 'pl1',
    name: 'Pâtes Carbonara',
    description: 'Pâtes, crème fraîche, jambon de dinde, parmesan',
    price: 16,
    category: 'Plats',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'pl2',
    name: 'Steak Frites',
    description: 'Steak de boeuf grillé, frites croustillantes, salade',
    price: 20,
    category: 'Plats',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'e1',
    name: 'Nuggets (x6)',
    description: 'Nuggets de poulet croustillants avec sauce',
    price: 7,
    category: 'Entrées',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'e2',
    name: 'Frites',
    description: 'Portion de frites dorées',
    price: 4,
    category: 'Entrées',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'b1',
    name: 'Coca-Cola',
    description: 'Canette 33cl',
    price: 3,
    category: 'Boissons',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'b2',
    name: 'Jus d\'Orange Frais',
    description: 'Jus pressé à froid',
    price: 5,
    category: 'Boissons',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800',
  }
];
