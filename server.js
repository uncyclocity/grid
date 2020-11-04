const express = require('express');
const app = express();
const mysql = require('mysql');
const dbconfig = require('./config/database.js');
const conn = dbconfig.init();
const connection = mysql.createConnection(dbconfig);

app.set('view engine', 'ejs');

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  var sql = "select * from agents";
  conn.query(sql, function(err, rows, fields){
    if(err) throw err;
    else res.render('grid.ejs', {list : rows});
  });
});

app.get('/users', (req, res) => {
  connection.query('SELECT * from agents', (err, rows) => {
    if (err) throw err;
    console.log('User info is: ', rows);
    res.send(rows);
  });
});

app.listen(8080, () => {
  console.log("서버 시작");
});