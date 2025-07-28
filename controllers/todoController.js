var mongoose = require("mongoose")


mongoose.connect("mongodb://localhost:27017/todo_manager")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error:", err));


var todoSchema = new mongoose.Schema({
    item: String
});


var Todo = mongoose.model("Todo", todoSchema, "Todo-Table");


var bodyParser = require("body-parser");


var urlEncodedParser = bodyParser.urlencoded({extended: false});


module.exports = function(app){
    app.get("/todo", async function(req, res){
        try {
            const data = await Todo.find({});
            res.render("todo", { todos: data });
        } catch (err) {
            console.error(err);
            res.status(500).send("Server Error");
        }
    });


    app.post("/todo", urlEncodedParser, async function (req, res) {
        try {
            const newTodo = new Todo(req.body); 
            const savedTodo = await newTodo.save(); 
            res.json(savedTodo);
        } catch (err) {
            console.error("Error saving todo:", err.message);
            res.status(500).send("Failed to save todo.");
        }
    });

    
    app.delete("/todo/:item", async function (req, res) {
        try {
            const itemToDelete = req.params.item.replace(/-/g, " ");
            const deleted = await Todo.deleteOne({ item: itemToDelete });
            res.json(deleted);
        } catch (err) {
            console.error("Error deleting todo:", err.message);
            res.status(500).send("Failed to delete todo.");
        }
    });
};