
const mysql = require('mysql');

//Conexion DB
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'prodlinehome',
    password: 'Solido20~',
    database: 'dblinehome'
});

connection.connect( error => {
    if(error) throw error;

    console.log('Database server running success.')
})

//exportar 
module.exports = connection;