const express = require("express");
const moment = require("moment");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://francis-admin:saltA_1897@cluster0.cwzz4qs.mongodb.net/todolistDB", { useNewUrlParser: true });

mongoose.set("strictQuery", true);

const itemsSchema = new mongoose.Schema({
    name: String,
    
  });
  

  const Item = mongoose.model("Item", itemsSchema);

  const item1 = new Item({
    name: "Go Market",
    
  });
  
  const item2 = new Item({
    name: "Cook Dinner",
    
  });

  const item3 = new Item({
    name: "Wash Dishes",
    
  });


const defaultItems = [item1, item2, item3];

//var items = [];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {

Item.find({}, function(err, foundItems){

    if (foundItems.length === 0) {
        Item.insertMany(defaultItems, function(err){  
            if(err){
              console.log(err);
            }else{
              console.log("Succesfully added to todolistDB");
            }
          });

          res.redirect("/");

    } else {

   //var date = moment().format("dddd, MMMM Do YYYY");
   res.render("list", {date: "Today", items: foundItems});
    }
 
 

});

});

app.get("/about", function(req, res) {
    res.render("about");
});

app.post("/", function(req, res) {

    const itemName = req.body.newItem;
    const item = new Item ({

        name: itemName
    });

    item.save();

    res.redirect("/");

    
    
});


app.post("/delete", function(req, res) {

  const checkedItemId = req.body.checkbox;

  Item.findByIdAndRemove(checkedItemId, function(err) {
    if (!err) {
      console.log("Successfully deleted checked item.");
      res.redirect("/");
    }
  });
});


app.listen(3000, function() {
    console.log("Server is running on port 3000");
});
