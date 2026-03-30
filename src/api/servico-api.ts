import axios from 'axios';

// Configuração básica do Axios conforme a stack obrigatória 
export const api = axios.create({
  baseURL: 'https://api-simulada-onda.com', // URL fictícia para o desafio
});

// Função para simular a busca de transações (Mock) [cite: 22]
export const buscarTransacoesMock = async () => {
  // Simula um atraso de rede para o React Query mostrar o loading
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    { id: '1', descricao: 'Depósito Inicial', valor: 5000, tipo: 'entrada', categoria: 'Saldo', dataCriacao: new Date().toISOString() },
  ];
};