const express = require('express');
const dbconfig = require('./config/database.js');
const conn = dbconfig.init();
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({
  secret: 'uncyclocity',
  resave: true,
  saveUninitialized: true
}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  var sql = "select * from agents";
  conn.query(sql, function(err, rows, fields){
    if(err) console.log('query is not excuted. insert fail...\n' + err);
    else res.render('grid.ejs', {list : rows});
  });
});

app.get('/save', function (req, res) {
  var sql = 'insert into agents values(?, ?, ?)';
  for(var i=0; i<req.session.db_length; i++){
    eval("var params = [req.session.user_" + i + ".no, req.session.user_" + i + ".name, req.session.user_" + i + ".part]");
    conn.query(sql, params, function(err) {
      if(err) console.log('query is not excuted. insert fail...\n' + err);
    });
  }
  req.session.user = null;
  res.redirect('/');
});

app.post('/delete', function (req, res) {
  var body = req.body;
  var sql = 'delete from agents';
  conn.query(sql, function(err) {
      if(err) console.log('query is not excuted. insert fail...\n' + err);
      else {
        for(var i=0; i<body.db_length; i++){
          eval("req.session.user_" + i + " = { 'no' : body.db_" + i + "_0, 'name' : body.db_" + i + "_1, 'part' : body.db_" + i + "_2 }");          
        }
        req.session.db_length = body.db_length;
        res.redirect('/save');
      }
  });
});

app.listen(8080, () => {
  console.log("서버 시작");
});