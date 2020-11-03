const express = require('express');
const app = express();
const fs = require("fs");

app.use(express.static(__dirname+"/script"));

app.get('/', (req, res) => {
  fs.readFile("grid.html", function(error, data){
      if(error){
          console.log("에러");
      } else {
          res.writeHead(200, {'Content-Type':'text/html'});
          res.end(data);
      }
  })
});

app.listen(8080, () => {
  console.log("서버 시작");
});