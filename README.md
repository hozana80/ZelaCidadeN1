# API ZelaCidade

**Sobre o Projeto
A API **ZelaCidade** foi criada para registrar e gerenciar problemas urbanos , como:

- Buracos
-Vazamentos
- Lixou
- Iluminação

Essa API
nos permite criar, visualizar, atualizar e deletar ocorrências.


## Tecnologias utilizadas

- Node.js
- Express
- SQLite
- SQLite3
- Postman
- Nodemon

---
## Instalação
 `npm install

 ---
 ##  Como Executar
```bash
npm run dev
```


`http:localhost:3000
`
[Clique Aqui](http:localhost:300)

---
##  Banco de Dados
O banco de dados é criado automaticamente
ao iniciar o projeto.

```
database.db
```

##  Tabela
|Campo         |     Descrição|
|--------------|--------------|
|id            |Identificador unico
|tipo_problema | Tipo do problema
|localizacao| Onde ocorreu
|descricao|Detalhes do incidente
|prioridade|Baixa, Média ou Alta
|nome_solicitante|Quem registrou
|data_registro|Data do registro
|hora_registro|Hora do registro
status_resolucao|Status (Padrão: Pendente)|
|

---


## Endpoints


### Rota Inicial


##
```http
GET /Incidentes?:id
```
Retorna uma página HTML simples com informações
da API.

---

### Rota para listar todos os incidentes
```

## Rota para buscar um incidente específico
(ID)
```http
GET /Incidentes?:id
EX / incidente/1

```http
POST / incidentes
```

### Body (JSON)
```json
PUT / incidentes/:id

### BODY (JSON)

```json

 {

        "tipo_problema": "Iluminação",

        "localizacao": "Rua das Flores, 123, Bairro das Margaridas",

        "descricao": "Poste queimado há dias",

        "prioridade": "Média",

        "nome_solicitante": "Ana Clara",

        "data_registro": "16/03/2026",

        "hora_registro": "10:30"

    }
```
### Rota para deletar um incidente
```http
DELETE /incidente/:id
```

## Segurança
A API utiliza `?`nas queries SQL:

```sql
WHERE id = ?
```

Isso evita o SQL Injection

----

## Conceitos

- CRUD (Create, Read, Uldate e Delete)
- Rotas com Express

---

## Projeto educacional
Este projeto foidesenvolvido



< ! -- ## Esses emojis é um padrão em praticamente TODO README:

##  Nome da API / Projeto

##  Sobre o Projeto

##  Objetivo

##  Tecnologias

##  Instalação

##  Como Executar

##  Configurações

##  Banco de Dados

##  Endpoints

##  Segurança

##  Conceitos

## Dicas / Melhorias

##  Autor

---

##  Descrição

##  Ferramentas

##  Ambiente

##  Dados

##  Tabela

##  Requisições

##  Entrada de dados

##  Saída de dados

##  Bloqueios / proteção

##  Aprendizado

##  Educacional

##  Atenção

## Importante

##  Contribuição

##  Licença -->

>
 
