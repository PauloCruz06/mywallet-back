# <p align="center"> MyWallet-Back-end </p>

<p align="center">
  <img src="https://raw.githubusercontent.com/PauloCruz06/mywallet-front/main/src/components/assets/images/MyWallet.png">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/author-PauloCruz06-4dae71?style=flat-square" />
  <img src="https://img.shields.io/github/languages/count/PauloCruz06/mywallet-back?color=4dae71&style=flat-square" />
</p>

## :clipboard: Descrição

A aplicação MyWallet tem o objetivo de simular uma conta de transações financeiras online onde o usuário pode registrar depósitos e pagamentos inserindo a data e descrição em cada transação.

***

## :computer:	 Tecnologias e Conceitos

- REST APIs
- JavaScript
- Node.js
- MongoDB

***

## :rocket: Rotas

Para todas as rotas autenticadas é necessário fornecer um token no header da requisição no seguinte formato: 
```json
headers: {
  Authorization: "Bearer token"
}
```

### Rota <span style="color:orange"> **POST** </span>/sign-up

Rota não autenticada. Nela é possível cadastrar um novo usuário

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "name": "nome do usuário", //string
  "email": "email do usuário", //string
  "password": "senha do usuário", //string
  "confirmPassword": "confirmação de senha" //string
}
```

### Rota <span style="color:orange"> **POST** </span>/sign-in

Rota não autenticada. Permite o usuário entrar na sua conta caso tenha se registrado, a requisição é respondida com um objeto que contém o token do usuário para usar em rotas autenticadas.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "email": "email do usuário", //string
  "password": "senha do usuário" //string
}
```

A api responderá com o json: 

```json
{
  "name": "nome do usuário",
  "email": "email do usuário",
  "token": "token gerado pela api"
}
```

### Rota <span style="color:orange"> **POST** </span>/transactions

Rota autenticada com header HTTP do tipo "Authorization". Nela é possível registrar uma transação feita pelo usuário, sendo necessário enviar a descrição da transação, o valor e se consiste em um pagamento ou não:

```json
{
  "description": "nome/descrição da transação", //string
  "amount": "valor da transação", //number
  "isPayment": "true/false" //boolean
}
```

### Rota <span style="color:green"> **GET** </span>/transactions

Rota autenticada com header HTTP do tipo "Authorization". Essa rota responderá com   um array contendo todas as transações feitas pelo usuário no seguinte formato:
```json
[
  {
    "email": "email do usuário",
    "description": "nome/descrição da transação",
    "amount": "valor da transação em formato de number",
    "isPayment": true, // ou 'false' no caso de um depósito
    "day": "10/02",
    "id": "63e6d75ce3b64dc5a0325d2d"
  }
]
```

### Rota <span style="color:red"> **DELETE** </span>/transactions/:id

Rota autenticada com header HTTP do tipo "Authorization". É possível deletar transações fornecendo o id da transação no endereço desta rota. O id é fornecido na rota GET /transactions. Em caso de sucesso a rota responderá com um status code 200.

***

## 🏁 Rodando a aplicação

Este projeto foi inicializado usando a última versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/PauloCruz06/mywallet-back.git
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Finalizado o processo, é só inicializar o servidor
```
npm run start
```
