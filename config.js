var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'sql6.freemysqlhosting.net',
  user     : 'sql6407394',
  password : 'BW7fnHYAWs',
  database : 'sql6407394',
  port:3306,
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});
module.exports = connection;