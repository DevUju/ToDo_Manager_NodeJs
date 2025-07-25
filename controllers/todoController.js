var data = [{item: "Build DJF Website"}, {item: "Get a DE Form"}, {item: "Secure an Internship in BE"}]

module.exports = function(app){
    
    app.get("/todo", function(req, res){
        res.render("todo", {todos: data});
    });

    app.post("/todo", function(req, res){
        
    });

    app.delete("/todo/:item", function(req, res){
        
    });
};