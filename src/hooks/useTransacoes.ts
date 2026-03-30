import { useQuery } from '@tanstack/react-query';
import { buscarTransacoesMock } from '../api/servico-api';

// Hook personalizado usando React Query 
export function useTransacoes() {
  return useQuery({
    queryKey: ['transacoes'],
    queryFn: buscarTransacoesMock,
    staleTime: 1000 * 60 * 5, // 5 minutos de cache
  });
}