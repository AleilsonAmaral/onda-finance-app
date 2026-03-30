import * as z from "zod";


export const loginEsquema = z.object({
  email: z.string().email("Insira um e-mail válido"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type LoginValores = z.infer<typeof loginEsquema>;