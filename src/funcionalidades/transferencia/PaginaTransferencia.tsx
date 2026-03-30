import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useFinanceiroStore } from "../../store/useFinanceiroStore";
import { transferenciaEsquema, TransferenciaValores } from "../autenticacao/esquemas/transferencia-esquema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../componentes/ui/form";
import { Input } from "../../componentes/ui/input";
import { Button } from "../../componentes/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentes/ui/card";
import { SendHorizontal, ArrowLeft } from "lucide-react";
import { formatarMoeda } from "../../utilitarios/formatadores";

export function PaginaTransferencia() {
  const navegar = useNavigate();
  const { saldo, adicionarTransacao } = useFinanceiroStore();

  const formulario = useForm<TransferenciaValores>({
    resolver: zodResolver(transferenciaEsquema),
    defaultValues: { favorecido: "", pix: "", valor: 0, categoria: "Transferência", descricao: "" },
  });

  const aplicarMascaraPixDinamica = (valor: string) => {
    // 1. Se o valor contém letras (exceto símbolos de máscara) ou @, tratei como texto livre (E-mail/Aleatória)
    if (/[a-zA-Z]/.test(valor) || valor.includes("@")) {
      return valor.toLowerCase().trim();
    }

    // Apliquei as máscaras financeiras
    const apenasNumeros = valor.replace(/\D/g, "");

    if (apenasNumeros.length > 0) {
      // Regra para Celular (11 dígitos): (00) 00000-0000
      if (apenasNumeros.length === 11 && apenasNumeros[2] === "9") {
        return apenasNumeros.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      }
      
      // Regra para CPF (até 11 dígitos)
      if (apenasNumeros.length <= 11) {
        return apenasNumeros
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      }
    }

    return valor;
  };

  const aplicarMascaraMoeda = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, "");
    if (!apenasNumeros) return "";
    const valorNumerico = Number(apenasNumeros) / 100;
    return valorNumerico.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  function aoEnviar(dados: TransferenciaValores) {
    const valorLimpo = typeof dados.valor === "string" 
      ? Number((dados.valor as string).replace(/\D/g, "")) / 100 
      : dados.valor;

    if (valorLimpo <= 0) {
      alert("Insira um valor válido para transferência!");
      return;
    }

    if (valorLimpo > saldo) {
      alert("Saldo insuficiente!");
      return;
    }

    adicionarTransacao({
      descricao: `PIX para ${dados.favorecido}`,
      valor: valorLimpo,
      tipo: "saida",
      categoria: dados.categoria,
    });

    alert("Transferência realizada com sucesso!");
    navegar("/dashboard");
  }

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <Button variant="ghost" onClick={() => navegar("/dashboard")} className="gap-2 text-slate-600 hover:text-blue-700">
        <ArrowLeft className="h-4 w-4" /> Voltar ao Painel
      </Button>

      <Card className="border-slate-200 shadow-xl overflow-hidden">
        <CardHeader className="bg-blue-700 text-white p-6">
          <CardTitle className="flex items-center gap-2 text-xl">
            <SendHorizontal className="h-6 w-6" /> Realizar Transferência PIX
          </CardTitle>
          <p className="text-blue-100 text-sm mt-1 font-medium italic">
            Saldo disponível: {formatarMoeda(saldo)}
          </p>
        </CardHeader>
        
        <CardContent className="pt-8 px-8 pb-8">
          <Form {...formulario}>
            <form onSubmit={formulario.handleSubmit(aoEnviar)} className="space-y-6">
              
              <FormField
                control={formulario.control}
                name="favorecido"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Nome do Favorecido</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Aleilson Amaral" className="h-11" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formulario.control}
                name="pix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Chave PIX (E-mail, CPF ou Celular)</FormLabel>
                    <FormControl>
                      <Input 
                        type="text"
                        placeholder="Digite o e-mail ou número" 
                        className="h-11"
                        {...field}
                        onChange={(e) => field.onChange(aplicarMascaraPixDinamica(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formulario.control}
                name="valor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Valor da Transferência</FormLabel>
                    <FormControl>
                      <Input 
                        type="text"
                        placeholder="R$ 0,00" 
                        className="h-11 text-lg font-bold text-blue-700"
                        value={field.value === 0 ? "" : field.value}
                        onChange={(e) => field.onChange(aplicarMascaraMoeda(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-800 h-14 text-lg font-bold shadow-lg transition-all active:scale-95">
                Confirmar Transferência
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}