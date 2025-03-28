# MindSupport - Backend API

## Tabela de Conteúdos

- [MindSupport - Backend API](#mindsupport---backend-api)
  - [Tabela de Conteúdos](#tabela-de-conteúdos)
  - [Descrição](#descrição)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
  - [Execução com Docker](#execução-com-docker)
  - [Rotas da API](#rotas-da-api)
    - [Autenticação](#autenticação)
    - [Usuários](#usuários)
    - [Profissionais](#profissionais)
    - [Grupos de Apoio](#grupos-de-apoio)
    - [Depoimentos](#depoimentos)
  - [Migrações do Banco de Dados](#migrações-do-banco-de-dados)
  - [Contribuição](#contribuição)
  - [Licença](#licença)

## Descrição

API backend para a clínica psicológica MindSupport, desenvolvida com Node.js, Express e Prisma ORM. Esta API fornece endpoints para gerenciamento de profissionais, grupos de apoio, depoimentos e usuários.

## Tecnologias Utilizadas

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- Docker
- JWT (Autenticação)
- Bcrypt (Hash de senhas)

## Pré-requisitos

- Node.js (v18+)
- Docker
- npm ou yarn

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/mindsupport-backend.git
   cd mindsupport-backend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:
   ```
   POSTGRES_URL=postgresql://postgres:postgres@localhost:5432/postgres?schema=public
   JWT_SECRET=sua_chave_secreta_jwt
   PORT=3000
   ```

## Execução com Docker

O projeto inclui um arquivo `docker-compose.yml` para facilitar a execução:

```yaml
version: "3.8"

services:
  postgres:
    image: postgres:latest
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_USER: postgres
      POSTGRES_DB: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  adminer:
    image: adminer:latest
    ports:
      - "8080:8080"
    depends_on:
      - postgres

  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - postgres
    environment:
      POSTGRES_URL: postgresql://postgres:postgres@postgres:5432/postgres?schema=public
      JWT_SECRET: sua_chave_secreta_jwt
    volumes:
      - .:/app
      - /app/node_modules

volumes:
  postgres_data:
```

Para iniciar os containers:

```bash
docker-compose up -d
```

## Rotas da API

### Autenticação

**POST /login**

- Autentica um usuário e retorna um token JWT
- Payload:
  ```json
  {
    "email": "usuario@exemplo.com",
    "password": "senha123"
  }
  ```

### Usuários

**POST /users**

- Cria um novo usuário
- Payload:
  ```json
  {
    "name": "Nome do Usuário",
    "email": "usuario@exemplo.com",
    "password": "senha123",
    "type": "patient" // ou "professional"
  }
  ```

**GET /users**

- Lista todos os usuários

**GET /users/:id**

- Obtém um usuário específico

**PUT /users/:id**

- Atualiza um usuário
- Payload:
  ```json
  {
    "name": "Novo Nome",
    "email": "novoemail@exemplo.com",
    "password": "novasenha123",
    "type": "professional"
  }
  ```

**DELETE /users/:id**

- Remove um usuário

### Profissionais

**POST /professionals**

- Cria um novo profissional
- Payload:
  ```json
  {
    "specialty": "Psicologia Clínica",
    "location": "São Paulo",
    "ageRangeService": "Adultos",
    "freeServices": 5,
    "userId": "uuid-do-usuario"
  }
  ```

**GET /professionals**

- Lista todos os profissionais

**GET /professionals/:id**

- Obtém um profissional específico

**PUT /professionals/:id**

- Atualiza um profissional
- Payload:
  ```json
  {
    "specialty": "Nova Especialidade",
    "location": "Rio de Janeiro",
    "ageRangeService": "Crianças e Adolescentes",
    "freeServices": 3
  }
  ```

**DELETE /professionals/:id**

- Remove um profissional

### Grupos de Apoio

**POST /support-groups**

- Cria um novo grupo de apoio
- Payload:
  ```json
  {
    "name": "Grupo de Ansiedade",
    "description": "Grupo para pessoas que sofrem com ansiedade",
    "location": "Online"
  }
  ```

**GET /support-groups**

- Lista todos os grupos de apoio

**GET /support-groups/:id**

- Obtém um grupo de apoio específico

**PUT /support-groups/:id**

- Atualiza um grupo de apoio
- Payload:
  ```json
  {
    "name": "Novo Nome do Grupo",
    "description": "Nova descrição",
    "location": "Presencial"
  }
  ```

**DELETE /support-groups/:id**

- Remove um grupo de apoio

### Depoimentos

**POST /testimonials**

- Cria um novo depoimento
- Payload:
  ```json
  {
    "description": "A terapia mudou minha vida para melhor!"
  }
  ```

**GET /testimonials**

- Lista todos os depoimentos

**GET /testimonials/:id**

- Obtém um depoimento específico

**PUT /testimonials/:id**

- Atualiza um depoimento
- Payload:
  ```json
  {
    "description": "Atualização do meu depoimento"
  }
  ```

**DELETE /testimonials/:id**

- Remove um depoimento

## Migrações do Banco de Dados

Para executar as migrações do Prisma:

```bash
npx prisma migrate dev
```

Para visualizar o banco de dados (após iniciar o Docker Compose):

- Acesse http://localhost:8080
- Servidor: postgres
- Usuário: postgres
- Senha: postgres
- Banco de dados: postgres

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT.
