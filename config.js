var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'bo0aaomgdmlknhwmfkty-mysql.services.clever-cloud.com',
  user     : 'uhrowqo83tnbkbpl',
  password : 'JKLb9Xp2C2KvzdNxo6Su',
  database : 'bo0aaomgdmlknhwmfkty'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});
module.exports = connection;