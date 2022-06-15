const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

//get all candidates
//When moving from server.js to apiRoutes/candidateRoutes 
//api.get/post/delete needs to be changed to router.
//and '/api/candidates' api is removed.
router.get('/candidates', (req,res) => {
    //const sql = `SELECT * FROM candidates`;
    const sql = `SELECT candidates.*, parties.name
                AS party_name
                FROM candidates
                LEFT JOIN parties
                ON candidates.party_id = parties.id`;

    db.query(sql, (err,rows) => {
        if(err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json ({
            message: 'success',
            data: rows
        });
    });
});

// db.query(`SELECT * FROM candidates`, (err,rows) => {
    //     console.log(rows)
    // });
    
    //get a single candidate
    router.get('/candidate/:id', (req,res) => {
      //  const sql = `SELECT * FROM candidates WHERE id = ?`;
        const sql = `SELECT candidates.*, parties.name
                    AS party_name
                    FROM candidates
                    LEFT JOIN parties
                    ON candidates.party_id = parties.id
                    WHERE candidates.id = ?`;

        const params = [req.params.id];
    
        db.query(sql, params, (err,row) => {
            if(err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: row
            });
        });
    });
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err,row) => {
//     if(err){
//         console.log(err)
//     }
//     console.log(row);
// });
router.delete('/candidate/:id', (req,res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err,result) => {
        if(err) {
            res.statusMessage(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        } else {
            res.json ({
                message: 'deleted',
                changes: result.affectedRows,//verify if rows were deleted
                id: req.params.id
            });
        };
    });
});

//Create a candidate 
router.post('/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({ error: err.message});
            return;
        }
        res.json ({
            message: 'success',
            data: body
        });
    });
});

//Update a candidate's party
router.put('/candidate/:id', (req,res) => {
    const sql = `UPDATE candidates SET party_id = ?
                WHERE id = ?`;
    const errors = inputCheck(req.body, 'party_id');

    if (errors) {
        res.status(400).json({ errors: errors });
        return;
    }
    
    const params = [req.body.party_id, req.params.id];
    db.query(sql, params, (err,result) => {
        if (err) {
            res.status(400).json({ error: err.message});
            //check if a record was found
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});


// db.query(`DELETE FROM candidates WHERE id= ?`, 1, (err,result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// const sql = (`INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES (?,?,?,?)`);
// const params = [1, 'Ronald', 'Firbank', 1];
// db.query(sql, params, (err,result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// app.get('/',(req,res) => {
//     res.json({
//         message: 'Hello World'
//     });
// });
// Default response for any other requests ( Not Found)

module.exports= router;