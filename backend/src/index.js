const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

/*
    Tipos de métodos HTTP
    GET: buscar/listar informaçoes no back-end
    POST: criar uma informação no back-end
    PUT: alterar uma informação no back-end
    DELETE: deletar uma informação no back-end
*/
/*
    Tipos de parametros

    Query Params: parametros nomeados enviados na rota após '?' (filtros)
    Route Params: parametros utilizados para identificar recursos
    Request Body: corpo da requisição, utilizado para criar ou alterar recursos
    
*/
/*
    SQL: MySQL, PostgreSQL, SQLite...
    NoSQL: MongoDB, CouchDB, etc
*/
/*
    Driver: SELECT* FROM users
    Query Builder: table('users').select('*').where()   -> usaremos o knex
*/

app.listen(3333);

