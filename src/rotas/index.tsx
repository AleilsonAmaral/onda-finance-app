import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PaginaLogin } from '../funcionalidades/autenticacao/PaginaLogin';
import { PaginaDashboard } from '../funcionalidades/dashboard/PaginaDashboard';
import { PaginaTransferencia } from '../funcionalidades/transferencia/PaginaTransferencia';
import { LayoutPrivado } from '../layouts/LayoutPrivado';

export const roteador = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <PaginaLogin />,
  },
  {
    element: <LayoutPrivado />,
    children: [
      {
        path: '/dashboard',
        element: <PaginaDashboard />,
      },
      { 
        path: '/transferencia', 
        element: <PaginaTransferencia /> 
      },
    ],
  },
]);