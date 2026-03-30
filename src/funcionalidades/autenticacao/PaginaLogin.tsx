import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { loginEsquema, LoginValores } from "./esquemas/login-esquema";

import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "../../componentes/ui/form";
import { Input } from "../../componentes/ui/input";
import { Button } from "../../componentes/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "../../componentes/ui/card";

export function PaginaLogin() {
  const navegar = useNavigate();

  const formulario = useForm<LoginValores>({
    resolver: zodResolver(loginEsquema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  function aoEnviar(dados: LoginValores) {
    console.log("Tentativa de login:", dados);
    navegar("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md border-slate-200 shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-blue-700">
            Onda Finance
          </CardTitle>
          <CardDescription>
            Digite seu e-mail e senha para acessar sua conta bancária.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...formulario}>
            <form onSubmit={formulario.handleSubmit(aoEnviar)} className="space-y-6">
              
              <FormField
                control={formulario.control}
                name="email"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel className="text-slate-700">E-mail</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="exemplo@email.com" 
                        type="email" 
                        className="border-slate-300 focus:border-blue-500"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formulario.control}
                name="senha"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel className="text-slate-700">Senha</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="••••••••" 
                        type="password" 
                        className="border-slate-300 focus:border-blue-500"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg font-semibold transition-all"
              >
                Entrar na Conta
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}