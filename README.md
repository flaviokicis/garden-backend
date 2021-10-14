# Backend - Desafio D1

**Resumo** 

O Backend do Jardim Virtual para o Desafio Fullstack D1.

## Conceitos

- Utilizado Server-Sent Events para comunicação com o Client.
- Gerenciamento de Erro e Response customizado
- Execução de Jobs/Tasks repetidas ou únicas
- Utilizado conceito parcial de Clean Architecture do Robert C. Martin nas entidades do Jardim, <br>aplicando o conceito de Injeção de Dependências.
- Configuração Human-Friendly em YAML
- MongoDB para armazenar IDs e estatísticas de cada usuário e estatísticas gerais.
- JasonWebToken para comunicação segura com o cliente

## Hierarquia de Entidades do Jardim

![Hierarquia](https://i.imgur.com/JJeTsHA.png)

## Instalação

```
$ npm install

$ npm run prod
ou
$ npm run dev
```

## Rotas da REST API

- POST /api/v1/auth/login - Login único, cria um usuário e salva um cookie contendo as informações
- GET /api/v1/auth/checkSession - Utilizado para checar se o usuário está logado de forma rápida
- GET /api/v1/listen - Tenta comunicação com o servidor para se inscrever como usuário do Jardim
- POST /api/v1/update - Envia uma informação para o servidor
- GET /api/v1/stats/global - Recebe informações estatísticas dos dados globais daquele dia (Parâmetro: Data, formato YYYY-MM-DD)
- GET /api/v1/stats/users - Recebe informações estatísticas dos usuários em Rank Top 10 (Parâmetro: Ação feita (Harvest, Pollinate, Water e etc.)

## Por:
Marcos Flávio Kicis

## Licença

Este repositório não é licenciado.
