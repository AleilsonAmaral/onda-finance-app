import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "../componentes/ui/button";
import { LogOut, Landmark, User } from "lucide-react";

export function LayoutPrivado() {
  const navegar = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
     
      {/* Adicionado 'fixed' e 'z-50' para o topo ficar sempre visível e acima de tudo */}
      <header className="fixed top-0 left-0 w-full bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between z-50 shadow-sm">
        <div className="flex items-center gap-2 text-blue-700 font-bold text-xl">
          <Landmark className="h-6 w-6 text-blue-600" />
          Onda Finance
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col text-right mr-2">
            <span className="text-sm font-semibold text-slate-700">Aleilson Amaral</span>
            <span className="text-xs text-slate-500">Conta Corrente</span>
          </div>
          <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
            <User className="h-5 w-5 text-slate-600" />
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navegar("/login")}
            className="text-slate-400 hover:text-rose-600 transition-colors"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto pt-24 pb-12 px-4 relative z-0">
        <Outlet /> 
      </main>
    </div>
  );
}