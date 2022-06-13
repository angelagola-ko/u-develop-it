
const mysql = require('mysql2');
const express = require("express");
const PORT = process.env.PORT || 3030;
const app = express();

//Express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Connect to database
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
// app.get('/',(req,res) => {
//     res.json({
//         message: 'Hello World'
//     });
// });
// Default response for any other requests ( Not Found)
app.use((req,res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});