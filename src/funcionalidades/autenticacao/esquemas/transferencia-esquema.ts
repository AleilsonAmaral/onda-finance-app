import { z } from "zod";

export const transferenciaEsquema = z.object({
  favorecido: z.string().min(3, "Digite o nome do favorecido"),
  
  // Aceita letras (e-mail) e números (CPF/Celular)
  pix: z.string().min(5, "Chave Pix inválida"),
  
  valor: z.any().refine((val) => {
    const valorLimpo = typeof val === "string" 
      ? Number(val.replace(/\D/g, "")) / 100 
      : val;
    
    return valorLimpo > 0;
  }, "O valor deve ser maior que zero"),

  categoria: z.string().min(1, "Selecione uma categoria"),
  descricao: z.string().optional(),
});

export type TransferenciaValores = z.infer<typeof transferenciaEsquema>;