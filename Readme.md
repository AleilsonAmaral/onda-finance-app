# Onda Finance - App de Gerenciamento Financeiro

Projeto desenvolvido para o desafio técnico da **JobZ**. A aplicação simula um ambiente bancário com foco em usabilidade, segurança e integridade de dados.

## Stack Tecnológica (Requisitos)
- **React + TypeScript + Vite** (Base da aplicação)
- **Zustand** (Estado global com persistência de saldo e histórico)
- **Tailwind CSS + shadcn/ui** (Interface moderna e responsiva)
- **React Hook Form + Zod** (Validação rigorosa de formulários)
- **Lucide React** (Iconografia)
- **Vitest** (Testes unitários de fluxo financeiro)

## Segurança e Boas Práticas
Para atender aos requisitos do desafio, foram implementadas as seguintes camadas:

1. **Engenharia Reversa**: O código passa por um processo de *build* otimizado pelo Vite, que realiza a minificação e ofuscação básica, dificultando a leitura da lógica de negócio no lado do cliente.
2. **Vazamento de Dados**: 
   - Implementação de **máscaras dinâmicas** (CPF, Celular e Moeda) que garantem a sanitização dos inputs antes do processamento.
   - Validação de esquema com **Zod**, impedindo o envio de dados maliciosos ou inconsistentes para a Store.
3. **Persistência Segura**: Uso de `localStorage` via Zustand Middleware para manter o estado do usuário entre sessões sem a necessidade de um banco de dados externo neste MVP.

##  Como rodar os testes
Para validar a lógica de saldo e as transações de transferência, execute:
bash
npm test