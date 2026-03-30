Onda Finance - App de Gerenciamento Financeiro


Projeto desenvolvido para o desafio técnico da JobZ. A aplicação simula um ambiente bancário completo, com foco rigoroso em organização de código, usabilidade (UX), segurança e integridade de dados.



Stack Tecnológica
A aplicação utiliza as ferramentas mais modernas do ecossistema React para garantir escalabilidade e performance:

Base: React 18 + TypeScript + Vite

Estilização: Tailwind CSS + CVA + shadcn/ui (Radix UI)

Roteamento: React Router Dom

Estado Global: Zustand (com persistência via Middleware)

Comunicação API: Axios + TanStack Query (React Query)

Formulários: React Hook Form + Zod (Validação de Schema)

Ícones: Lucide React

Testes: Vitest

Segurança e Boas Práticas
Para atender aos requisitos de proteção e integridade de um sistema financeiro:

Proteção de Dados e Fluxo
Sanitização de Inputs: Implementação de máscaras dinâmicas (CPF, Celular e Moeda) que garantem a integridade dos dados antes do processamento.

Validação de Schema: Uso do Zod para impedir a persistência de dados inconsistentes ou maliciosos.

Persistência Consistente: Uso de localStorage via Zustand Middleware para manter a sessão e o saldo sincronizados entre navegações.

Arquitetura e Build
Otimização de Build: O código passa por minificação e ofuscação automática via Vite, reduzindo o payload e dificultando a leitura direta da lógica de negócio no cliente.

Componentização: Uso de componentes reutilizáveis e atômicos seguindo os padrões do shadcn/ui.

Testes Implementados:

Foco na regra de negócio principal para garantir a confiabilidade do sistema:

Fluxo de Transferência: Teste unitário utilizando Vitest para validar:

A atualização correta do saldo em tela.

A inserção precisa da transação no histórico após o sucesso.

Prevenção de erros em valores inválidos.

Como rodar o projeto localmente:

# 1. Clone o repositório
git clone https://github.com/AleilsonAmaral/onda-finance-app.git

# 2. Entre na pasta do projeto
cd onda-finance-app

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev

# 5. Para rodar os testes
npm test


Decisões Técnicas e Roadmap

Decisões Atuais:
Zustand Persist: Escolhido para simular a persistência de uma sessão real (Login mock) e saldo, garantindo que o usuário não perca dados ao atualizar a página (F5).

TanStack Query: Implementado para gerenciar o estado assíncrono, preparando a aplicação para uma integração real com API.

Melhorias Futuras:

Implementação de autenticação real via JWT.

Integração com gateways de pagamento via Axios.

Gráficos de evolução financeira (Recharts) e categorização automática de gastos.

Dark Mode persistente.

Desenvolvido com por Aleilson Amaral 