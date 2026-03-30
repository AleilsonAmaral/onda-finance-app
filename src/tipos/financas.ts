export interface Transacao {
  id: string;
  tipo: 'entrada' | 'saida';
  valor: number;
  descricao: string;
  categoria: string;
  dataCriacao: string;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  estaAutenticado: boolean;
}