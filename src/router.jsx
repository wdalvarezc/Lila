// src/router.jsx
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/home';
import Stock from './pages/stock';
import Pedidos from './pages/pedidos';
import ErrorPage from './pages/error';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'stock', element: <Stock /> },
      { path: 'pedidos', element: <Pedidos /> },
      // Ruta comodín para 404
      { path: '*', element: <ErrorPage /> },
    ],
  },
]);
