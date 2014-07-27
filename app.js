var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  Person = require('./models/main.js').Person,
  app = express();



app.set("view engine", "ejs");
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

peopleList = [];

var findPersonById = function(id) {
  console.log("findPersonById:", id);
  for (var i = 0; i < peopleList.length; i++) {
    if (peopleList[i].id === parseInt(id)) {
      return peopleList[i];
    }
  };
};

app.get("/people", function(req, res){
  Person.all(function(err, people) {
    if (err) {
      console.error("ERROR!!!", err);
    } else {
      peopleList = [];
      people.forEach(function(person){
        peopleList.push(person);
      });
      console.log("peopleList", peopleList);
      res.render("people/index", {people: peopleList});
    }
  })
});

app.get("/people/new", function(req, res){
  res.render("people/new");
});

app.get("/people/saved", function(req, res) {
  res.render("people/saved");
})

app.get("/people/:id", function(req, res){
  person = findPersonById(req.params.id);
  res.render("people/show", {person: person});
});

app.get("/people/:id/edit", function(req, res){
  var person = findPersonById(req.params.id);
  res.render("people/edit", {person: person});
});

app.post("/people", function(req, res){
  var params = {firstname: req.body.firstname, lastname: req.body.lastname}
  Person.create(params, function(err, res) {
    if (err) {
      console.error("ERROR!!!", err);
    } else {
      console.log("res.rows",res.rows[0]);
    }
  });
  res.redirect("/people/saved");
});

app.delete("/people/:id", function(req, res){
  person = findPersonById(req.params.id);
  person.destroy();
  res.redirect("/people/saved");
});

app.put("/people/:id", function(req, res){
  person = findPersonById(req.body.id);
  person.firstname = req.body.firstname;
  person.lastname = req.body.lastname;
  console.log("Edit Person", person);
  person.update(person, function(err, res) {
    if (err) {
      console.error("ERROR!!!", err);
    } else {
      console.log(res.rows);
    }
  });
  res.redirect("/people/saved");
});

app.listen(3000, function(){
  console.log("THE SERVER IS LISTENING ON localhost:3000");
});
