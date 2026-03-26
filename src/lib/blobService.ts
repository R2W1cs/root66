export interface OrderData {
  id: string;
  date: string;
  type: 'delivery' | 'pickup';
  customerInfo: {
    name: string;
    phone: string;
    address?: string;
    city?: string;
    instructions?: string;
  };
  items: any[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  status: 'new' | 'processing' | 'completed' | 'cancelled';
}

export async function saveOrderToBlob(order: OrderData) {
  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    
    if (!res.ok) {
      throw new Error('Failed to save order to Vercel blob');
    }
    console.log(`Order ${order.id} saved successfully via API.`);
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
}

export async function getOrdersFromBlob(): Promise<OrderData[]> {
  try {
    const res = await fetch('/api/orders');
    if (!res.ok) {
      throw new Error('Failed to fetch orders from Vercel blob');
    }
    const orders = await res.json();
    return orders;
  } catch (error) {
    console.error('Error getting orders from blob:', error);
    throw error;
  }
}
