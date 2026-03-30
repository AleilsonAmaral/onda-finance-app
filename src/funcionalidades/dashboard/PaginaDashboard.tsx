import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { useFinanceiroStore } from "../../store/useFinanceiroStore";
import { formatarMoeda, formatarData } from "../../utilitarios/formatadores";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentes/ui/card";
import { Button } from "../../componentes/ui/button"; 
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "../../componentes/ui/table";
import { History, Tag, Wallet, SendHorizontal } from "lucide-react";

export function PaginaDashboard() {
  const navegar = useNavigate(); 
  const [estaCarregado, setEstaCarregado] = useState(false);
  const saldo = useFinanceiroStore((state) => state.saldo);
  const transacoes = useFinanceiroStore((state) => state.transacoes);

  useEffect(() => {
    setEstaCarregado(true);
  }, []);

  if (!estaCarregado) {
    return <div className="min-h-screen bg-slate-50" />;
  }

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Painel Financeiro</h1>
          <p className="text-slate-500 text-sm mt-1">Bem-vindo, Aleilson Amaral!</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => navegar("/transferencia")} 
            className="bg-blue-600 hover:bg-blue-700 gap-2 shadow-md transition-all hover:scale-105"
          >
            <SendHorizontal className="h-4 w-4" />
            Transferir PIX
          </Button>

          <div className="hidden sm:block text-sm text-slate-500 bg-white px-3 py-1 rounded-full border shadow-sm">
            Status: <span className="text-green-600 font-medium">Conta Ativa</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-blue-700 text-white border-none shadow-blue-200 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Saldo Atual</CardTitle>
            <Wallet className="h-5 w-5 opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold tracking-tighter">
              {formatarMoeda(saldo)}
            </div>
            <p className="text-xs mt-1 opacity-70">Disponível para transferência</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-sm bg-white">
        <CardHeader className="flex flex-row items-center gap-2 border-b">
          <History className="h-5 w-5 text-blue-600" />
          <CardTitle>Histórico Recente</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="font-semibold text-slate-700">Descrição</TableHead>
                <TableHead className="font-semibold text-slate-700">Categoria</TableHead>
                <TableHead className="font-semibold text-slate-700 text-center">Data</TableHead>
                <TableHead className="font-semibold text-slate-700 text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transacoes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-16 text-slate-400 italic">
                    Nenhuma movimentação registrada.
                  </TableCell>
                </TableRow>
              ) : (
                transacoes.map((t) => (
                  <TableRow key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <TableCell className="font-medium text-slate-800">{t.descricao}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs border">
                        <Tag className="h-3 w-3" />
                        {t.categoria}
                      </span>
                    </TableCell>
                    <TableCell className="text-center text-slate-600">
                      {formatarData(t.dataCriacao)}
                    </TableCell>
                    <TableCell className={`text-right font-bold ${t.tipo === 'saida' ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {t.tipo === 'saida' ? '- ' : '+ '}
                      {formatarMoeda(t.valor)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}