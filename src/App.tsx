/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Order } from './pages/Order';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { Admin } from './pages/Admin';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'menu',
        element: <Menu />,
      },
      {
        path: 'order',
        element: <Order />,
      },
      {
        path: 'gallery',
        element: <Gallery />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
  {
    path: '/admin',
    element: <Admin />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
