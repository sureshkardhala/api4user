var express=require("express");
var bodyParser=require('body-parser');
var app = express();
var authenticateController=require('./controllers/authenticate-controller');
var registerController=require('./controllers/register-controller');
var dbConn = require('./config');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
/* route to handle login and registration */
app.post('/api/register',registerController.register);
app.post('/api/authenticate',authenticateController.authenticate);
// Retrieve all users
app.get("/userinformation", function (req, res) {
    dbConn.query("SELECT * FROM users", function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: "Complete Data." });
    });
  });

  // Retrieve all users
app.get("/posts", function (req, res) {
    dbConn.query("SELECT * FROM posts", function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: "Complete Data." });
    });
  });


  
// Add a new Record
app.post("/addpost", function (req, res) {
    console.log(req.body);
  let name = req.body.name;
  let category = req.body.category;
  let description = req.body.description;
  let contact = req.body.contact;
  let price = req.body.price;
  console.log(name + " " +category+" " + description + " " + contact+" "+price);
  if (!name &&  !description && !contact && category && price) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide Information to be add" });
  }

  dbConn.query(
    "INSERT INTO posts(name, category, description, contact, price) value(?,?,?,?,?) ",
    [name, category, description, contact, price],
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "post has been added",
      });
    }
  );
});


//  Delete post
app.delete("/deletepost", function (req, res) {
    let id = req.body.id;
  
    if (!id) {
      return res.status(400).send({ error: true, message: "Please provide id" });
    }
    dbConn.query(
      "DELETE FROM posts WHERE id = ?",
      [id],
      function (error, results, fields) {
        if (error) throw error;
        return res.send({
          error: false,
          data: results,
          message: "User Data has been deleted",
        });
      }
    );
  });

  
// Retrieve user with id
app.get("/post/:id", function (req, res) {
    let id = req.params.id;
  
    if (!id) {
      return res.status(400).send({ error: true, message: "Please provide id" });
    }
  
    dbConn.query(
      "SELECT * FROM posts where id=?",
      id,
      function (error, results, fields) {
        if (error) throw error;
        return res.send({
          error: false,
          data: results[0],
          message: "Information by ID.",
        });
      }
    );
  });
  

    
// Retrieve user with id
app.get("/post_category/:category", function (req, res) {
    let category = req.params.category;
  
    if (!category) {
      return res.status(400).send({ error: true, message: "Please provide category" });
    }
  
    dbConn.query(
      "SELECT * FROM posts where category=?",
      category,
      function (error, results, fields) {
        if (error) throw error;
        return res.send({
          error: false,
          data: results[0],
          message: "Information by ID.",
        });
      }
    );
  });
  



app.get('/', function(req, res) {
    res.json({ message: 'welcome to our olxclone' });
});
// set port
app.listen(3306, function () {
    console.log("Node app is running on port 3306");
  });
  module.exports = app;
