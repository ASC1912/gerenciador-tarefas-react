# Aplicação Web Dinâmica e Interativa

**Link da Aplicação em Produção:** https://ASC1912.github.io/gerenciador-tarefas-react/

## Descrição do Projeto

Aplicação Web Dinâmica e Interativa desenvolvida em React com TypeScript, tendo como tema um **Sistema de Gerenciamento de Tarefas**. O projeto consome a API pública DummyJSON (`/todos`), implementando autenticação, roteamento protegido, gerenciamento de estado global e testes automatizados. Durante o desenvolvimento, ferramentas de IA foram utilizadas como apoio para a estruturação de trechos de código, auxílio nas configurações do projeto (como CI/CD e roteamento), implementação das suítes de testes (Vitest e Playwright) e elaboração desta documentação técnica.

## Instruções de Execução Local

> **Sobre o login:** Para facilitar o teste do fluxo de roteamento protegido, os formulários de login já vêm preenchidos por padrão com as credenciais de teste fornecidas pela documentação da API DummyJSON (Usuário: `emilys` | Senha: `emilyspass`).

**1. Clone o repositório e acesse a pasta do projeto:**

```bash
git clone https://github.com/ASC1912/gerenciador-tarefas-react.git
cd gerenciador-tarefas-react
```

**2. Instale as dependências do projeto:**

```bash
yarn install
```

**3. Execute o servidor de desenvolvimento:**

```bash
yarn dev
```

**4. Acesse a aplicação:**
Abra o navegador e acesse o endereço local http://localhost:5173.

## Instruções para Execução dos Testes

O projeto conta com duas suítes de testes distintas.

**Testes de Componentes (Vitest e RTL):** Valida a renderização e o comportamento isolado da interface.

```bash
yarn test
```

**Testes Ponta a Ponta / E2E (Playwright):** Simula a interação real do usuário no navegador.

```bash
yarn playwright test
```

## Detalhamento dos 10 Requisitos Contemplados

**01. Estrutura de componentes e tipagem com TypeScript**
O projeto foi criado com Vite (React + TypeScript). A interface foi dividida em componentes independentes, como o `TaskItem`, e foi utilizada a propriedade `children` para criar componentes que podem envolver outros de forma flexível. Foram definidos os tipos exatos de cada informação usando `interfaces`, priorizando a tipagem estrita e evitando o uso de `any`. O visual foi estruturado com o Mantine UI, garantindo um design organizado e consistente desde o início.

**02. Estado Reativo, Imutabilidade e Ciclo de Vida**
O estado da aplicação é gerenciado através do hook `useState`. A inclusão e edição de tarefas seguem o princípio da imutabilidade, utilizando o operador de espalhamento (_spread_, `...`) para atualizar os dados sem alterar o array original diretamente. O ciclo de vida dos componentes é controlado com o hook `useEffect`, utilizando arrays de dependências configurados com precisão para sincronizar os dados com o `localStorage`.

**03. Estado Global com Context API e Custom Hooks**
O estado global foi extraído e modularizado utilizando a Context API nativa do React através de dois contextos independentes. O `AuthContext` (acessado pelo custom hook `useAuth`) gerencia os dados de sessão e o token do usuário. O `TaskContext` (acessado via `useTasks`) centraliza a lógica de listagem, persistência local e manipulação de novas tarefas. Ambos os hooks incluem mecanismos internos de validação que disparam erros no console caso sejam consumidos fora de seus respectivos Providers.

**04. Roteamento e Layouts com React Router**
A navegação da aplicação foi estruturada utilizando a biblioteca `react-router-dom`. Foi implementado um layout persistente (`PageLayout`) que mantém o cabeçalho e os controles de tema acessíveis em todas as telas, renderizando as páginas filhas dinamicamente através do componente `<Outlet />`. O roteamento foi configurado mesclando abordagens declarativas com `<NavLink>` (incluindo feedback visual de rota ativa) e navegação programática com `useNavigate()`. Além disso, foram estabelecidas rotas dinâmicas utilizando `useParams()` para capturar parâmetros de URL e renderizar páginas de detalhes específicas para cada tarefa (`/tarefa/:id`).

**05. Interface Gráfica e Formulários com Mantine UI**
A interface de usuário foi construída utilizando a biblioteca Mantine UI. Foi configurado um tema através do `<MantineProvider>` e a estrutura da aplicação utiliza layouts responsivos nativos (como `Group`, `Stack` e `Container`). O controle de entrada de dados foi implementado utilizando o hook `@mantine/form` para gerenciar o estado e as validações. Na listagem de tarefas, implementou-se um sistema de paginação. Além disso, aplicou-se um feedback visual de carregamento (`LoadingOverlay`) durante as requisições reais da API nos formulários de login e de criação de novas tarefas.

**06. Fluxo de Autenticação JWT e Rotas Protegidas**
A aplicação consome a API externa DummyJSON através do endpoint `POST /auth/login` para validar as credenciais. O token JWT recebido (`accessToken`) é armazenado de forma persistente no `localStorage` do navegador, e o estado da sessão é distribuído globalmente através da Context API (`AuthContext`). O sistema divide o acesso em diferentes níveis: uma rota pública (`/`) para visualização geral e uma rota restrita (`/create-task`) dedicada à criação de novos itens. A segurança do roteamento é garantida pelo componente `ProtectedRoute` (ou lógica de guarda de rotas), que bloqueia acessos não autorizados e protege funcionalidades exclusivas. O layout reage de forma dinâmica ao estado de autenticação, atualizando os menus de navegação instantaneamente.

**07. Consumo de API REST, Interceptors e Validação com Zod**
A comunicação HTTP foi centralizada utilizando a biblioteca Axios (`src/services/api.ts`), com a `baseURL` configurada para a API externa DummyJSON. Foram implementados interceptors de requisição para injetar o token JWT automaticamente no cabeçalho HTTP (`Authorization: Bearer`) e interceptors de resposta para o tratamento global e amigável de falhas de rede. A consistência dos dados é garantida pelo Zod. Os schemas de validação foram integrados de forma nativa aos formulários do Mantine utilizando o `zodResolver`. Adicionalmente, as respostas da API durante a criação de novas tarefas são validadas estritamente via `.safeParse()` antes de integrarem o contexto da aplicação.

**08. Testes Automatizados com Vitest e RTL**
A qualidade e estabilidade do código são asseguradas através de testes de componentes utilizando Vitest e React Testing Library (RTL). A arquitetura de testes isola dependências da aplicação construindo wrappers de contexto em memória (`MantineProvider`, `BrowserRouter`, `AuthContext` e `TaskContext`). As asserções seguem as melhores práticas de acessibilidade, priorizando a visão do usuário com consultas como `getByRole` e `getByText`, enquanto a biblioteca `@testing-library/user-event` garante a simulação fiel de interações e fluxos reais, como limpeza de campos, digitação e submissão de formulários.

**09. Testes Ponta a Ponta (E2E) com Playwright**
Foram implementados testes de ponta a ponta (E2E) para garantir o funcionamento integrado da aplicação em um ambiente de navegador real utilizando o Playwright (`playwright.config.ts`). Os testes foram configurados para rodar em modo _headless_ e integram diretamente com o servidor de desenvolvimento do Vite. Foram automatizados dois fluxos críticos utilizando localizadores semânticos: o fluxo completo de autenticação e redirecionamento de rotas protegidas, e o fluxo de criação de uma nova tarefa validando sua inclusão no catálogo da página inicial.

**10. Pipeline de CI/CD e Deploy em Produção**
A entrega e a integração contínua (CI/CD) foram estruturadas através do GitHub Actions de forma unificada no _workflow_ `ci-cd.yml`. A esteira garante a estabilidade do código executando as suítes de testes automatizados (Vitest e Playwright) com instalações determinísticas (`yarn install --frozen-lockfile`) e, em seguida, automatiza o _build_ de produção e o _deploy_ para o GitHub Pages. O roteamento no ambiente de produção foi assegurado com a configuração da propriedade `base` no Vite e a implementação de uma estratégia de _fallback_ (`404.html`) para suportar a navegação SPA nativa. A integridade da branch `main` é mantida por regras de proteção no repositório, exigindo a aprovação nos testes antes de qualquer integração.
