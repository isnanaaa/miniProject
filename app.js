const express = require('express');
const app = express();
const conn = require('./config/db');

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

app.listen(3000);