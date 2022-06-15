const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        //mySQL uername,
        user: 'root',
        //mySQL pw
        password: 'Ecostar45*',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

module.exports = db;