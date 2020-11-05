const express = require('express');
const dbconfig = require('./config/database.js');
const conn = dbconfig.init();
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  var sql = "select * from agents";
  conn.query(sql, function(err, rows, fields){
    if(err) console.log('쿼리가 실행되지 않았습니다\n' + err);
    else res.render('grid.ejs', {list : rows});
  });
});

app.post('/save', function (req, res){
  var body = req.body;

  if(body.edit_length > 0){
    var sql = 'update agents set name = ?, part = ? where id = ?';
    for(var i = 0; i < body.edit_length; i++){
      edit_row = eval("body.edit_" + i) - 1;
      var params = eval("[body.db_" + edit_row + "_1, body.db_" + edit_row + "_2, body.db_" + edit_row + "_0]");
      console.log(params);
      conn.query(sql, params, function(err, rows, fields){
        if(err) console.log('쿼리가 실행되지 않았습니다\n' + err);
      });
    }
  }

  if(body.ins_length > 0){
    var sql = 'insert into agents values(?, ?, ?)';
    for(var i = 0; i < body.ins_length; i++){
      ins_row = eval("body.ins_" + i) - 1;
      var params = eval("[body.db_" + ins_row + "_0, body.db_" + ins_row + "_1, body.db_" + ins_row + "_2]");          
      console.log(params);
      conn.query(sql, params, function(err, rows, fields){
        if(err) console.log('쿼리가 실행되지 않았습니다\n' + err);
      });
    }
  }
  
  res.redirect('/');
});

app.listen(8080, () => {
  console.log("서버 시작");
});