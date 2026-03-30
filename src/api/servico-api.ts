import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api-simulada-onda.com', 
});

export const buscarTransacoesMock = async () => {

   await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    { id: '1', descricao: 'Depósito Inicial', valor: 5000, tipo: 'entrada', categoria: 'Saldo', dataCriacao: new Date().toISOString() },
  ];
};