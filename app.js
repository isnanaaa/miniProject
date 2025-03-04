const express = require('express');
const app = express();
const conn = require('./config/db');
app.use(express.json());

app.get('/get-mahasiswa', function(req, res) {
    const queryStr = "SELECT id, name, prodi FROM from mahasiswa WHERE deleted_at IS NULL";
    conn.query(queryStr, (err, result) => {
        if (err){
            console.log(err);
            res.error(err.sqlMessage, res);
            return;
        } else {
            res.status(200).json({
                "success": true,
                "message": "Data mahasiswa berhasil diambil",
                "data": result
            });
        }
    });
})

app.post('/store-mahasiswa', function(req, res) {
    console.log(req.body);
    const param = req.body;
    const name = param.name;
    const prodi = param.prodi;
    const now = new Date();
    
    const queryStr = "INSERT INTO mahasiswa (name, prodi, created_at) VALUES (?, ?, ?)";
    const values = [name, prodi, now];

    conn.query(queryStr, values, (err, result) => {
        if (err){
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            });
        } else {
            res.status(200).json({
                "success": true,
                "message": "Data mahasiswa berhasil disimpan",
                "data": result
            });
        }
    });
})

app.get('/get-mahasiswa-by-id', function (req, res) {
    const param = req.query;
    const id = param.id;

    const queryStr = "SELECT * FROM mahasiswa WHERE deleted_at IS NULL AND id = ?";
    const values = [id]
    conn.query(queryStr, values, (err, result) => {
        if (err){
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            });
        } else {
            res.status(200).json({
                "success": true,
                "message": "Data mahasiswa berhasil diambil",
                "data": result
            });
        }
    });
})

app.listen(3000);