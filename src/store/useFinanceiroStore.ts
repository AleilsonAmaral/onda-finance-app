import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Transacao } from '../tipos/financas';

interface EstadoFinanceiro {
  saldo: number;
  transacoes: Transacao[];
  adicionarTransacao: (nova: Omit<Transacao, 'id' | 'dataCriacao'>) => void;
  limparDados: () => void;
}

export const useFinanceiroStore = create<EstadoFinanceiro>()(
  persist(
    (set) => ({
      saldo: 5000, 
      transacoes: [],

      adicionarTransacao: (dados) => {
        const novaTransacao: Transacao = {
          ...dados,
          id: crypto.randomUUID(),
          dataCriacao: new Date().toISOString(),
        };

        set((estado) => ({
          transacoes: [novaTransacao, ...estado.transacoes],
          saldo: 
            dados.tipo === 'entrada' 
              ? estado.saldo + dados.valor 
              : estado.saldo - dados.valor,
        }));
      },

      limparDados: () => set({ saldo: 5000, transacoes: [] }),
    }),
    {
      name: 'onda-finance-dados',
      storage: createJSONStorage(() => localStorage),
    }
  )
);