export const formatarMoeda = (valor: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
};

export const formatarData = (dataIso: string) => {
  return new Date(dataIso).toLocaleDateString('pt-BR');
};