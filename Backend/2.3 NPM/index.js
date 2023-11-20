import nameGenerator from "sillyname";
import superheroes from "superheroes";

var sillyname = nameGenerator();
var superheroName = superheroes.random();

console.log(`My name is ${sillyname}.`);
console.log(`My superhero name is ${superheroName}.`);
