import { put, list } from '@vercel/blob';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      const order = req.body;
      await put(`orders/order-${order.id}.json`, JSON.stringify(order), {
        access: 'public',
        contentType: 'application/json',
      });
      return res.status(200).json({ success: true });
    } catch (e: any) {
      console.error(e);
      return res.status(500).json({ error: 'Failed to write blob' });
    }
  } 
  
  if (req.method === 'GET') {
    try {
      const { blobs } = await list({ prefix: 'orders/' });
      const orders = [];
      
      for (const blob of blobs) {
        if (blob.url.endsWith('.json')) {
          const response = await fetch(blob.url);
          const data = await response.json();
          orders.push(data);
        }
      }
      
      orders.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      return res.status(200).json(orders);
    } catch (e: any) {
      console.error(e);
      return res.status(500).json({ error: 'Failed to read blobs' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
