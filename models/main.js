var Person = require('./person');

var Models = {};

Models.Person = Person;

// Models.Person.all(function(err, people){
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(people);  
//   }
// });

// Models.Person.findBy("id", 1, function(err, person){
//   if (err) {
//     console.error("ERROR!!!", err)
//   } else {
//     console.log("found", person);
//   }
// });

// Models.Person.create({firstname: "Banana", lastname: "Man"}, function(err, person){
//   if (err) {
//     console.error("ERROR!!!", err);
//   } else {
//     console.log("created", person);
//   }
// });

// Models.Person.destroy();

module.exports = Models;