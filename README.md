# Gerenciador de Estoque

Sistema web completo para gerenciamento de estoque, com controle de produtos, funcionários, fornecedores, categorias e movimentações.

## Tecnologias

- Next.js
- React
- Prisma ORM
- SQLite
- Tailwind CSS

## Funcionalidades

- Cadastro de produtos com preço e estoque
- Cadastro de funcionários com CPF e cargo
- Cadastro de fornecedores com CNPJ
- Cadastro de categorias
- Registro de movimentações de entrada e saída
- Atualização automática do estoque ao registrar movimentação
- Validações no Front-End e Back-End

## Como rodar localmente

Clone o repositório:
```bash
git clone https://github.com/Marcus-Verissimo-Bastos/gerenciador-estoque.git
cd estoque/gerenciador-estoque
```

Instale as dependências:
```bash
npm install
```

Configure o banco de dados:
```bash
npx prisma migrate dev
```

Inicie o servidor:
```bash
npm run dev
```

Acesse http://localhost:3000

##Estrutura do projeto

```
pages/
├── index.js          → tela inicial
├── produtos.js       → gerenciar produtos
├── funcionarios.js   → gerenciar funcionários
├── fornecedores.js   → gerenciar fornecedores
├── categorias.js     → gerenciar categorias
└── movimentacoes.js  → registrar movimentações

pages/api/
├── produtos/         → rotas da API
├── funcionarios/
├── fornecedores/
├── categorias/
└── movimentacoes/
```
