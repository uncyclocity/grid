var mysql = require('mysql');
var dbinfo = {
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : '0227',
    database : 'grid'
}

module.exports = {
    init: function () {
        return mysql.createConnection(dbinfo);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) throw err;
            else console.log('mysql is connected successfully!');
        });
    }
}