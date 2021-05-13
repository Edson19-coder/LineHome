
const mysql = require('mysql');

//Conexion DB
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'dblinehome'
});

connection.connect( error => {
    if(error) throw error;

    console.log('Database server running success.')
})

//exportar 
module.exports = connection;