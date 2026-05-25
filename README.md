# Sprint02 - Application Development

Painel web para monitoramento de localidades com indicadores climaticos, visualizacao em mapa e classificacao de risco.

## Requisitos

- Node.js 22+
- npm 10+

## Configuracao

1. Instale dependencias:

```bash
npm install
```

2. Configure variaveis de ambiente:

```bash
cp .env.example .env
```

## Scripts

- `npm run dev`: sobe ambiente local com Vite
- `npm run lint`: valida padrao de codigo
- `npm run test`: executa testes unitarios
- `npm run test:watch`: executa testes em watch mode
- `npm run typecheck`: valida tipos TypeScript
- `npm run build`: gera build de producao
- `npm run preview`: serve build localmente

## Arquitetura

- `src/domain`: entidades de negocio
- `src/application`: DTOs e mapeadores
- `src/infrastructure`: clientes HTTP e servicos externos
- `src/presentation`: paginas, componentes e hooks
- `src/shared`: utilitarios, constantes e configuracoes transversais

## Testes

Testes unitarios em `tests/unit` cobrindo utilitarios de risco e mapeamento de clima.

## Build

As rotas principais usam lazy loading para reduzir o bundle inicial.
