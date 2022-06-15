
//const mysql = require('mysql2');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
const express = require("express");
//const { application } = require('express');
//const inputCheck = require('./utils/inputCheck');
//const { resourceLimits } = require('worker_threads');
const PORT = process.env.PORT || 3030;
const app = express();

//Express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//For using after seperation
//use apiRoutes
app.use('/api', apiRoutes);

//Connect to database
// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         //mySQL uername,
//         user: 'root',
//         //mySQL pw
//         password: 'Ecostar45*',
//         database: 'election'
//     },
//     console.log('Connected to the election database.')
// );
//Default response for any other request (Not Found)
app.use((req,res) => {
    res.status(404).end();
});
//Start sever after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
});