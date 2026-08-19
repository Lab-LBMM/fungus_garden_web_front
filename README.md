# MicrobioBase - Fungus Garden Web Front

Interface web interativa para consulta, filtragem e visualização de dados taxonômicos, morfológicos e ecológicos de fungos e microrganismos. Projeto desenvolvido para o laboratório LBMM / UNESP.

---

## Pré-requisitos e Tecnologias Necessárias

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

* **[Node.js](https://nodejs.org/)**: Versão `18.0.0` ou superior (recomendado Node.js LTS v20+)
* **[npm](https://www.npmjs.com/)**: Gerenciador de pacotes (instalado automaticamente com o Node.js) ou **yarn** / **pnpm** / **bun**.
* **Git**: Para clonar e gerenciar o repositório.

---

## Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias e bibliotecas:

* **[React 19](https://react.dev/)**: Biblioteca principal para construção da interface de usuário baseada em componentes.
* **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática ao código.
* **[Vite](https://vitejs.dev/)**: Ferramenta moderna e rápida para build e servidor de desenvolvimento com suporte a HMR (*Hot Module Replacement*).
* **[React Router DOM v7](https://reactrouter.com/)**: Biblioteca para gerenciamento de rotas e navegação SPA (*Single Page Application*).
* **[Lucide React](https://lucide.dev/)**: Coleção de ícones modernos e leves para React.
* **CSS Vanilla**: Estilização modularizada por componente/página com variáveis CSS para fácil manutenção.
* **[ESLint](https://eslint.org/)**: Ferramenta de linter para garantia de qualidade e padronização do código.

---

## Comandos para Rodar o Projeto

Siga os passos abaixo para baixar, instalar e executar a aplicação localmente:

### 1. Clonar o Repositório
```bash
git clone https://github.com/Lab-LBMM/fungus_garden_web_front.git
cd fungus_garden_web_front
```

### 2. Instalar as Dependências
```bash
npm install
```

### 3. Executar o Servidor de Desenvolvimento
```bash
npm run dev
```
Após executar o comando acima, o servidor estará rodando. Acesse a URL indicada no terminal (geralmente `http://localhost:5173` ou `http://localhost:5174`).

### 4. Gerar Build de Produção
Para compilar e otimizar a aplicação para ambiente de produção:
```bash
npm run build
```
Os arquivos gerados serão salvos na pasta `dist/`.

### 5. Visualizar a Build Localmente
Para testar a build de produção localmente antes do deploy:
```bash
npm run preview
```

### 6. Executar o Linter
Para verificar eventuais erros de sintaxe ou inconsistências de código:
```bash
npm run lint
```

---

## Estrutura do Projeto

A organização de pastas do código-fonte dentro do diretório `src/` segue a estrutura abaixo:

```text
src/
├── assets/          # Imagens, logos e recursos estáticos
├── components/      # Componentes reutilizáveis de UI (Header, Footer, OrganismCard, Filtros, etc.)
├── data/            # Dados locais e esquemas de dados mockados
├── pages/           # Páginas da aplicação (HomePage, SearchPage, DetailPage, DataSourcesPage, TeamPage, ContactPage)
├── styles/          # Estilos globais e variáveis CSS
├── types/           # Definições de interfaces e tipos TypeScript
├── App.tsx          # Componente raiz e configuração das rotas
└── main.tsx         # Ponto de entrada da aplicação React
```

---

## Contribuição e Licença

Este projeto faz parte das iniciativas de pesquisa da UNESP / LBMM. Para dúvidas ou suporte, entre em contato com a equipe de desenvolvimento.


