# Estados e Cidades — REST API

API RESTful desenvolvida em Node.js para consulta de dados geográficos do Brasil, incluindo estados, capitais, regiões e municípios.

---

## Visão Geral

O projeto expõe endpoints HTTP para acesso estruturado a dados de todos os estados brasileiros e seus respectivos municípios. A arquitetura segue o princípio de separação de responsabilidades, dividindo a lógica de negócio, os dados e a configuração do servidor em módulos independentes.

---

## Tecnologias

| Tecnologia | Finalidade |
|------------|------------|
| Node.js    | Runtime de execução |
| Express    | Roteamento e servidor HTTP |
| CORS       | Controle de acesso à API |
| JavaScript (ES6) | Linguagem principal |

---

## Estrutura do Projeto

```
projeto/
├── app.js                        # Configuração do servidor e definição das rotas
└── modulo/
    ├── funcao.js                 # Funções de negócio (filtros e formatação)
    └── estados_cidades.js        # Base de dados estática (estados e municípios)
```

---

## Instalação

**Pré-requisitos:** Node.js instalado na máquina.

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git

# Acesse a pasta do projeto
cd seu-repositorio

# Instale as dependências
npm install express --save
npm install cors --save

# Inicie o servidor
node app.js
```

O servidor será iniciado na porta `8080` por padrão.  
Para usar outra porta, defina a variável de ambiente `PORT` antes de executar.

---

## Endpoints

A documentação interativa da API está disponível em:

```
GET /v1/senai/help
```

### Referência completa

| # | Método | Rota | Descrição |
|---|--------|------|-----------|
| 1 | GET | `/v1/senai/estados` | Lista as siglas de todos os estados com contagem total |
| 2 | GET | `/v1/senai/dados/estado/:uf` | Retorna nome, capital e região de um estado pela sigla |
| 3 | GET | `/v1/senai/capital/estado/:uf` | Retorna a capital de um estado pela sigla |
| 4 | GET | `/v1/senai/estados/capital/brasil` | Lista todos os estados que já foram capital federal do Brasil |
| 5 | GET | `/v1/senai/estados/regiao/:regiao` | Retorna todos os estados de uma região geográfica |
| 6 | GET | `/v1/senai/cidades/estado/:uf` | Retorna todos os municípios de um estado pela sigla |

### Exemplos de uso

```
GET /v1/senai/dados/estado/sp
GET /v1/senai/capital/estado/rj
GET /v1/senai/estados/regiao/nordeste
GET /v1/senai/cidades/estado/ap
```

---

## Respostas

### Sucesso — `200 OK`

```json
{
  "uf": "SP",
  "descricao": "Sao Paulo",
  "capital": "São Paulo",
  "regiao": "Sudeste"
}
```

### Recurso não encontrado — `404 Not Found`

```json
{
  "message": "O estado informado não foi encontrado"
}
```

---

## Arquitetura e Decisões Técnicas

- **Modularização:** A lógica de negócio (`funcao.js`) é completamente desacoplada do servidor (`app.js`), facilitando manutenção e testes independentes.
- **Normalização de entrada:** Todos os parâmetros de rota são convertidos com `.toUpperCase()` antes da comparação, evitando falhas por diferença de capitalização.
- **Dados estáticos:** A base de dados é um módulo JavaScript local (`estados_cidades.js`), eliminando dependência de banco de dados externo para esta versão.
- **CORS configurado:** A API aceita requisições de qualquer origem (`*`) via método `GET`.

---

## Autor

**Matheus Aguiar**  
Versão: 1.0 — Abril de 2026
