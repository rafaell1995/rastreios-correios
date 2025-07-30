# Rastreio de Encomendas - Projeto

Este é um projeto baseado no framework [Next.js](https://nextjs.org), que tem como objetivo permitir o rastreamento de encomendas utilizando a API dos Correios.

## Funcionalidades Implementadas

### 1. **Rastreio de Encomendas**:

- O sistema permite o rastreamento de encomendas inserindo o código de rastreio.
- O código de rastreio é enviado para a API do site de rastreio (Site Rastreio), que retorna informações detalhadas sobre o status da encomenda.
- O sistema exibe eventos com detalhes sobre o rastreio e, se houver URL presente no texto do evento, ela é transformada em um link clicável.

### 2. **Ícones de Eventos**:

- Cada evento de rastreio possui um ícone associado. Caso não haja ícone fornecido pela API, um ícone padrão (SVG) será exibido.
- O ícone padrão é um ícone simples de documento e pode ser substituído por ícones específicos no futuro.

### 3. **Detecção e Exibição de URLs no Texto**:

- A função `parseDetalhe` foi criada para detectar URLs dentro do texto do campo `detalhe` dos eventos e transformá-las em links clicáveis.
- A expressão regular é utilizada para identificar URLs no texto e exibi-las de forma destacada.

### 4. **Feedback Visual**:

- Mensagens de erro são exibidas de forma clara caso a encomenda não seja encontrada ou se ocorrer algum erro na requisição.

## Estrutura do Projeto

Este projeto segue a estrutura padrão do Next.js, com o App Router, que pode ser encontrada no diretório `app`.

### 1. **Página Principal (`page.tsx`)**:

- O arquivo `app/page.tsx` contém a interface de rastreio. Nele, o usuário pode inserir um código de rastreio, e os eventos serão exibidos após a consulta à API.

### 2. **API de Rastreio (`api/rastreio/route.ts`)**:

- A API faz a comunicação com o Site Rastreio. A requisição é feita com o método `POST`, passando o código de rastreio. O retorno da API é processado para ser exibido na interface.

### 3. **Função `parseDetalhe`**:

- A função `parseDetalhe` detecta URLs no campo `detalhe` de um evento de rastreio e converte a URL em um link clicável, permitindo que o usuário acesse o portal diretamente.

## Como Rodar o Projeto

### Passo 1: Instalação das dependências

Clone o repositório e instale as dependências utilizando o gerenciador de pacotes de sua preferência:

```bash
git clone https://github.com/rafaell1995/rastreios-correios.git
cd rastreios-correios
npm install
# ou
yarn install
# ou
pnpm install
```

### Passo 2: Rodar o servidor de desenvolvimento

Execute o servidor de desenvolvimento com o comando:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Agora, abra o navegador e acesse [http://localhost:3000](http://localhost:3000) para visualizar o aplicativo em execução.

### Passo 3: Modificação do Código

Você pode começar a editar a página principal em `app/page.tsx`. O Next.js aplicará as mudanças automaticamente quando você salvar o arquivo.

## Funcionalidade de Rastreio de Encomendas

1. O usuário insere o **código de rastreio** no campo de texto e clica no botão **Rastrear**.
2. A requisição é enviada para a API do Site Rastreio ([https://www.siterastreio.com.br/api-correios](https://www.siterastreio.com.br/api-correios)).
3. O sistema retorna os **eventos de rastreio** da encomenda, com detalhes e descrições, e exibe os ícones associados aos eventos.
4. Se houver **detalhes com URLs**, elas serão automaticamente convertidas em links clicáveis.

## Dependências

Este projeto utiliza as seguintes dependências:

- **Next.js** (framework)
- **React** (biblioteca de UI)
- **Tailwind CSS** (framework CSS para estilo)

### Instalação do Tailwind CSS

Este projeto já tem o Tailwind CSS configurado. Para saber mais sobre como personalizar o Tailwind, consulte a [documentação oficial](https://tailwindcss.com/docs/installation).

## Deploy no Vercel

A maneira mais fácil de implantar sua aplicação Next.js é utilizar a plataforma [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Consulte a [documentação de deploy do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.

---

Se tiver dúvidas ou quiser contribuir, fique à vontade para abrir uma _issue_ ou fazer um _pull request_ no repositório.
