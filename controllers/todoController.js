var mongoose = require("mongoose")
mongoose.connect("mongodb+srv://agnesanosike:UjuAg123.@cluster0.mongodb.net/Todo_Manager")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error:", err));


var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model("Todo", todoSchema);

(async () => {
    try {
      const itemOne = new Todo({ item: "Get DE Fomm" });
      await itemOne.save();
      console.log("Item Saved");
    } catch (err) {
      console.error("Error saving item:", err);
    }
  })();

    

var bodyParser = require("body-parser");

var data = [{item: "Build DJF Website"}, {item: "Get a DE Form"}, {item: "Secure an Internship in BE"}]

var urlEncodedParser = bodyParser.urlencoded({extended: false});



module.exports = function(app){
    
    app.get("/todo", function(req, res){
        res.render("todo", {todos: data});
    });

    app.post("/todo", urlEncodedParser, function(req, res){
        data.push(req.body);
        res.json(data)
    });

    app.delete("/todo/:item", function(req, res){
        data = data.filter(function(todo){
            return todo.item.replace(/ /g, "-") !== req.params.item;
        });
        res.json(data)
    });
};