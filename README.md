<h1 align="center" style="font-weight: bold;">Desafio Livraria da Buzz 💻</h1>

<p align="center">
 <a href="#tech">Tecnologias</a> • 
 <a href="#started">Começando</a> • 
 <a href="#routes">Endpoints da API</a>
</p>

<p align="center">
    <b>A aplicação consiste em um sistema simples de e-commerce de livros, com gestão de estoque, realização de pedidos, filtros por diversos parâmetros e visualização dos produtos vendidos.</b>
</p>

<h2 id="technologies">💻 Tecnologias</h2>

- JavaScript
- Jest
- Supertest
- Sequelize
- NodeJS
- PostgreSQL
- Git

<h2 id="architecture"> ⚙ Arquitetura </h2>

```bash
/bookstore
├── /db
│   ├── /migrations
│   ├── /config
│   └── /seeders
├── /src
│   ├── /controllers
│   ├── /models
│   ├── /routes
│   ├── /services
│   ├── app.js
│   └── server.js
├── /tests
│   ├── bookController.test.js
│   └── orderController.test.js
├── jest.config.js
├── package.json
├── .env
└── README.md
```

<h3>Componentes Principais</h3>

- **db/migrations**: Contém todos os arquivos de migração do banco de dados gerados pelo Sequelize. As migrations são utilizadas para criar, alterar ou remover tabelas e colunas no banco de dados de forma versionada e controlada.

- **db/config**: Contém o arquivo de configuração do Sequelize que define os parâmetros de conexão para os diferentes ambientes (desenvolvimento, teste, produção).

- **src/controllers**: Contém os controladores que lidam com a lógica de processamento das requisições HTTP. Eles são responsáveis por receber as requisições, chamar os serviços apropriados e retornar a resposta adequada ao cliente.

- **src/models**: Contém os modelos Sequelize que definem a estrutura das tabelas do banco de dados e suas relações.

- **src/routes**: Contém os arquivos de definição das rotas da API. Cada rota é associada a um controlador que trata as requisições para aquela rota.

- **src/services**: Contém os serviços que encapsulam a lógica de negócio da aplicação. Os serviços são responsáveis por interagir com os modelos do banco de dados e realizar operações como criação, leitura, atualização e exclusão de registros.

- **src/app.js**: O ponto de entrada da aplicação. Configura o Express, inicializa os middlewares, define as rotas.

- **src/server.js**: Encapsulamento feito para separar as configurações do app e o servidor.

- **tests**: Contém os arquivos de testes unitários escritos com Jest e Supertest. Os testes garantem que os controladores e os serviços funcionem corretamente.

- **package.json**: Define as dependências do projeto, scripts de execução e configuração do npm.

- **.env**: Arquivo de configuração que guarda variáveis de ambiente sensíveis como credenciais de acesso ao banco de dados.

<h3> Decisões de arquitetura </h3>
Optei por uma arquitetura modular, separando responsabilidades em controladores, serviços, modelos e rotas, visando a clareza e a manutenção do código. Utilizei também o Sequelize como ORM para facilitar a interação com o banco de dados PostgreSQL, garantindo consistência e facilidade nas migrações. A organização dos arquivos em diretórios específicos melhora a legibilidade e facilita a navegação no projeto. Os testes unitários escritos com Jest e Supertest, asseguram a qualidade do código e a correta funcionalidade da aplicação. A utilização de variáveis de ambiente centraliza configurações sensíveis, promovendo segurança e flexibilidade na configuração do ambiente.

<h2 id="started">🚀 Começando</h2>

<h3>Pré-Requisitos</h3>

- [NodeJS](https://nodejs.org/)
- [PostgreSQL](https://postgresql.org/)
- [Git](https://github.com/)

<h3>Clonando</h3>

Como clonar o projeto:

```bash
git clone https://github.com/danilomfreitas/desafio-backend-buzzmonitor.git
```

<h3>Configurando variáveis .env</h3>

Use o `.env.sample` como referência para criar seu arquivo de configuração `.env` com suas credenciais do banco de dados

```yaml
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE_DEV=database_name
DB_DATABASE_TEST=database_name
DB_DATABASE_PROD=database_name
DB_HOST=your_host
DB_DIALECT=postgres
PORT=your_port
NODE_ENV=development/production/test
```

<h3>Configurando o ambiente</h3>

Instalando as dependências:

```bash
npm install
```

Conecte-se ao PostgreSQL e crie o banco de dados, após isso execute as migrações:

```bash
npx sequelize-cli db:migrate --config=db/config/config.js --migrations-path=db/migrations
```

Executando o projeto:

```bash
npm start
```

Executando os testes unitários:

```bash
npm test
```

<h2 id="routes">📍 Endpoints da API</h2>


| rota               | descrição                                         
|----------------------|-----------------------------------------------------
| <kbd>GET /books</kbd>     | recupera a lista de todos os livros registrados no sistema [(ver detalhes)](#get-books)
| <kbd>POST /books</kbd>     | cadastra um novo livro ao sistema [(ver detalhes)](#post-books)
| <kbd>GET /books/:id</kbd>     | recupera um livro por seu ID [(ver detalhes)](#get-books-id)
| <kbd>GET /books/search</kbd>     | recupera uma lista de livros baseados nos filtros escolhidos [(ver detalhes)](#get-books-search)
| <kbd>PUT /books/:id</kbd>     | edita as informações de um livro específico [(ver detalhes)](#put-books)
| <kbd>DELETE /books/:id</kbd>     | exclui um dos livros cadastrados a partir do ID [(ver detalhes)](#delete-books)
| <kbd>POST /orders/</kbd>     | solicita um pedido de venda de um livro [(ver detalhes)](#post-orders)
| <kbd>GET /orders/</kbd>     | recupera a lista de todos os pedidos solicitados [(ver detalhes)](#get-orders)
| <kbd>GET /orders/search</kbd>     | recupera uma lista de pedidos baseado nos filtros escolhidos [(ver detalhes)](#get-orders-search)



<h3 id="get-books">GET /books</h3>

**RESPONSE**
```json
[
    {
        "id": 2,
        "title": "Harry Potter and the Philosopher's Stone",
        "author": "JK Rowling",
        "release_year": 1997,
        "inventory": 12,
        "createdAt": "2024-06-23T18:39:07.672Z",
        "updatedAt": "2024-06-23T19:59:48.324Z"
    },
    {
        "id": 4,
        "title": "Lord of the Rings",
        "author": "JRR Tolkien",
        "release_year": 1954,
        "inventory": 12,
        "createdAt": "2024-06-24T14:30:41.346Z",
        "updatedAt": "2024-06-24T14:30:41.346Z"
    }
]
```

<h3 id="post-books">POST /books</h3>

**REQUEST**
```json
{
  "title": "Harry Potter and the Philosopher's Stone",
  "author": "JK Rowling",
  "release_year": 1997,
  "inventory":12
}
```

<h3 id="get-books-id">GET /books/:id</h3>

**RESPONSE**
```json
{
    "id": 2,
    "title": "Harry Potter and the Philosopher's Stone",
    "author": "JK Rowling",
    "release_year": 1997,
    "inventory": 2,
    "createdAt": "2024-06-23T18:39:07.672Z",
    "updatedAt": "2024-06-23T19:59:48.324Z"
}
```

<h3 id="get-books-search">GET /books/search?title=book_title&author=book_author&release_year=book_year</h3>

**RESPONSE**
```json
{
    "id": 2,
    "title": "Harry Potter and the Philosopher's Stone",
    "author": "JK Rowling",
    "release_year": 1997,
    "inventory": 2,
    "createdAt": "2024-06-23T18:39:07.672Z",
    "updatedAt": "2024-06-23T19:59:48.324Z"
}
```

<h3 id="put-books">PUT /books/:id</h3>

**REQUEST**
```json
{
  "inventory":10
}
```

<h3 id="delete-books">DELETE /books/:id</h3>

Retorna um status code <code>204</code>, código de sucesso sem conteúdo adicional

<h3 id="post-orders">POST /orders/</h3>

**REQUEST**
```json
{
  "book_id":2,
  "quantity":5
}
```

**RESPONSE**
```json
{
    "id": 7,
    "book_id": 2,
    "quantity": 2,
    "status": "Accepted",
    "updatedAt": "2024-06-24T14:58:15.421Z",
    "createdAt": "2024-06-24T14:58:15.421Z"
}
```

<h3 id="get-orders">GET /orders/</h3>

**RESPONSE**
```json
[
    {
        "id": 1,
        "book_id": 2,
        "quantity": 4,
        "status": "Accepted",
        "createdAt": "2024-06-23T18:48:36.858Z",
        "updatedAt": "2024-06-23T18:48:36.858Z",
        "book": {
            "id": 2,
            "title": "Harry Potter and the Philosopher's Stone",
            "author": "JK Rowling",
            "release_year": 1997,
            "inventory": 8,
            "createdAt": "2024-06-23T18:39:07.672Z",
            "updatedAt": "2024-06-24T14:58:15.425Z"
        }
    },
    {
        "id": 2,
        "book_id": 2,
        "quantity": 20,
        "status": "Refused",
        "createdAt": "2024-06-23T18:48:44.975Z",
        "updatedAt": "2024-06-23T18:48:44.975Z",
        "book": {
            "id": 2,
            "title": "Harry Potter and the Philosopher's Stone",
            "author": "JK Rowling",
            "release_year": 1997,
            "inventory": 8,
            "createdAt": "2024-06-23T18:39:07.672Z",
            "updatedAt": "2024-06-24T14:58:15.425Z"
        }
    }
]
```

<h3 id="get-orders">GET /orders/search?book_id=your_id&status=order_status</h3>

**RESPONSE**
```json
[
    {
        "id": 2,
        "book_id": 2,
        "quantity": 20,
        "status": "Refused",
        "createdAt": "2024-06-23T18:48:44.975Z",
        "updatedAt": "2024-06-23T18:48:44.975Z",
        "book": {
            "id": 2,
            "title": "Harry Potter and the Philosopher's Stone",
            "author": "JK Rowling",
            "release_year": 1997,
            "inventory": 8,
            "createdAt": "2024-06-23T18:39:07.672Z",
            "updatedAt": "2024-06-24T14:58:15.425Z"
        }
    },
    {
        "id": 6,
        "book_id": 2,
        "quantity": 3,
        "status": "Refused",
        "createdAt": "2024-06-23T20:00:29.340Z",
        "updatedAt": "2024-06-23T20:00:29.340Z",
        "book": {
            "id": 2,
            "title": "Harry Potter and the Philosopher's Stone",
            "author": "JK Rowling",
            "release_year": 1997,
            "inventory": 8,
            "createdAt": "2024-06-23T18:39:07.672Z",
            "updatedAt": "2024-06-24T14:58:15.425Z"
        }
    }
]
```


<h3>Documentos de apoio</h3>

[📝 Operadores do sequelize](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)

[📝 Uso do isNaN()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/isNaN)

[📝 Migrações usando sequelize](https://sequelize.org/docs/v6/other-topics/migrations/)
