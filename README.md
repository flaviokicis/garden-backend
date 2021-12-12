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

## Configuração em YAML

```

# Time Intervals Example: 1 h, 30 m, 15 m, 5 h...
# Always separate it with a space.

## Garden:
## This will be the initial amount
garden:
  fruits:
    strawberries: 3
    apples: 2
  flowers:
    sunflowers: 3
    roses: 2
    orchids: 2
  decorations:
    benches: 1
  animals:
    dogs: 2
    ducks: 1

# max = maximum instances of fruit spawned
fruits:
  apple:
    max: 5 <--- Número máximo de frutas em uma só vez
    growth_interval: '35 m'  <--- Quanto tempo para crescer até chegar no limite
    harvesting_interval: '1 h'
    watering_interval: '4 h'
  strawberry:
    max: 4
    growth_interval: '35 m'
    harvesting_interval: '30 m'
    watering_interval: '45 m'

flowers:
  sunflower:
    watering_interval: '1 h' 
    pollination_interval: '45 m'
  rose:
    watering_interval: '1 h'
    pollination_interval: '45 m'
  orchid:
    watering_interval: '1 h'
    pollination_interval: '1 h'

decorations:
  bench:
    cleaning_interval: '30 m'

animals:
  dog:
    petting_interval: '5 m'
    feeding_interval: '35 m'
  duck:
    petting_interval: '15 m'
    feeding_interval: '45 m'

users:
  max_users: 4  <-- Usuarios Máximos do Jardim
  max_nickname_length: 15  <--- Número de Caracteres Máximos de um Usuário
```

## Por:
Marcos Flávio Kicis

## Licença

Sem licensa
