var express = require("express");
var todoController = require("./controllers/todoController")

var app = express();

// Template Engine
app.set("view engine", "ejs");

// Static Files
app.use(express.static("node-js-playlist/public"));

// Fire Controller
todoController(app)

// Listen to Port
// localhost:3000/assets/styles.css

app.listen(3000);

console.log("You are listening to port 3000");