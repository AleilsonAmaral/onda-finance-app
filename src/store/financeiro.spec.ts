import { describe, it, expect, beforeEach } from 'vitest';
import { useFinanceiroStore } from './useFinanceiroStore';

describe('Fluxo Financeiro - Onda Finance', () => {
  beforeEach(() => {
    // Reseta a store antes de cada teste para garantir isolamento
    const { getState } = useFinanceiroStore;
    getState().transacoes = [];
    // Ajuste aqui para o seu saldo inicial padrão
  });

  it('deve subtrair o valor do saldo ao realizar uma transferência (saída)', () => {
    const { adicionarTransacao } = useFinanceiroStore.getState();
    const saldoInicial = useFinanceiroStore.getState().saldo;
    
    const valorTransferencia = 1000;

    adicionarTransacao({
      descricao: 'Transferência para Hugo JobZ',
      valor: valorTransferencia,
      tipo: 'saida',
      categoria: 'Transferência'
    });

    const saldoFinal = useFinanceiroStore.getState().saldo;
    
    // Verifica se o saldo diminuiu exatamente o valor da transferência
    expect(saldoFinal).toBe(saldoInicial - valorTransferencia);
  });

  it('deve registrar a transação no histórico', () => {
    const { adicionarTransacao } = useFinanceiroStore.getState();
    
    adicionarTransacao({
      descricao: 'Teste de Histórico',
      valor: 50,
      tipo: 'saida',
      categoria: 'Teste'
    });

    const transacoes = useFinanceiroStore.getState().transacoes;
    expect(transacoes.length).toBeGreaterThan(0);
    expect(transacoes[0].descricao).toBe('Teste de Histórico');
  });
});