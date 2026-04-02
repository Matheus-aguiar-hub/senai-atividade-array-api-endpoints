/************************************************************************************
* Objetivo: Arquivo responsável pela ciação da API do projeto Estados e Cidades
* Data: 01/04/2026
* Autor: Matheus Aguiar
* Versão: 1.0
*
* Instalação do express - npm install express --save
*                                     Dependência responsável pela utilização do protocolo 
*                                     HTTP para criar uma API
*
* Instalação do cors    - npm install cors --save
*                                     Dependência responsável pela configurações a serem 
*                                     realizadas para a permissão de acesso da API
*************************************************************************************/

//Import das dependências para criar a API
const express   = require('express')
const cors      = require('cors')

//Criando um objeto para manipular o express
const app = express()

//Conjunto de permissões a serem aplicadas no CORS da API
const corsOptions = {
    origin: ['*'], // A origem da requisição, podendo ser um IP ou * (todos)
    methods: 'GET', // Os verbos que serão liberados na API (GET, POST, PUT e DELETE)
    allowedHeaders: ['Content-type', 'Autorization'] // São permissões de cabeçalho do CORS
}

//Configura as permissões da API através do CORS
app.use(cors(corsOptions)) 

//Response -> Retorno da API 
//Request -> São chegadas de dados da API

const estadosCidades = require('./modulo/funcao.js')

//Criando EndPoints para a API

//Retorna dados dos estados, filtrando pelo uf
app.get('/v1/senai/dados/estado/:uf', function(request, response){
    let sigla = request.params.uf
    let estado = estadosCidades.getDadosEstado(sigla)

    if(estado){
        response.status(200)
        response.json(estado)
    }else{
        response.status(404)
        response.json({"message": "O estado informado não foi encontrado"})
    }
})

//Retorna dados da capital de cada estado, filtrando pela uf
app.get('/v1/senai/capital/estado/:uf', function(request, response){
    let sigla = request.params.uf
    let estado = estadosCidades.getCapitalEstado(sigla)

    if(estado){
        response.status(200)
        response.json(estado) 
    }else{
        response.json({"message": "Os dados das capitais informada não foram encontradas"})
        response.status(404)
    }

})

//Retorna dados que foram capitais do Brasil
app.get('/v1/senai/estados/capital/brasil', function(request, response){
    let estados = estadosCidades.getCapitalPais()

    response.json(estados)
    response.status(200)

})

//Retorna dados dos estados filtrando pela região
app.get('/v1/senai/estados/regiao/:regiao', function(request, response){
    let regiao = request.params.regiao
    let estado = estadosCidades.getEstadosRegiao(regiao)

    if(estado){
        response.json(estado)
        response.status(200)
    }else{
        response.json({"message": "A região informada não foi encontrada"})
        response.status(404)
    }
})

//Retorna dados das cidades filtrando pelo uf
app.get('/v1/senai/cidades/estado/:uf', function(request, response){
    let sigla = request.params.uf
    let estado = estadosCidades.getCidades(sigla)

    if(estado){
        response.json(estado)
        response.status(200)
    }else{
        response.json({"message": "A cidade informada não foi encontrado"})
        response.status(404)
    }
})

app.get('/v1/senai/estados' , function(request, response){

    let estados = estadosCidades.getListaDeEstados()

    response.json(estados)
    response.status(200)
})

app.get('/v1/senai/help', function(request, response){
    let docAPI = {
        'API-description': 'API para manipular dados de Estados e Cidades',
        'Date': '2026-04-02',
        'Development': 'Matheus Aguiar',
        'Version': '1.0',
        'EndPoints': [
            {   'id': 1,
                'Rota 1': '/v1/senai/estados',
                'Obs': 'Retorna a lista de todos os estados'
            },
            {   'id': 2,
                'Rota 2': '/v1/senai/dados/estado/sp',
                'Obs': 'Retorna os dados dos estado filtrando pela sigla do estado'
            },
            {   'id': 3,
                'Rota 3': '/v1/senai/capital/estado/rj',
                'Obs': 'Retorna os dados das capital filtrando pela sigla do estado'
            },
            {   'id': 4,
                'Rota 4': '/v1/senai/estados/capital/brasil',
                'Obs': 'Retorna todos os estados que formaram capital do Brasil'
            },
            {   'id': 5,
                'Rota 5': '/v1/senai/estados/regiao/nordeste',
                'Obs': 'Retorna todos os estados referente a uma região'
            },
            {   'id': 6,
                'Rota 6': '/v1/senai/cidades/estado/ap',
                'Obs': 'Retorna todas as cidades filtrando pela sigla do estado'
            }
        ] 
    }

    response.status(200)
    response.json(docAPI)
})

//Seve para inicializar a API para receber requisições
app.listen(8080, function(){
    console.log('API Funcionando e aguardando novas requisições ...')
})