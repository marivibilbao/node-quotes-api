const express = require("express");
const app = express();

//Importante para que pueda aparecer el POST en Postman
app.use(express.json());

const quotes = require("./quotes.json");

app.get('/', function(request, response) {
  response.send('/quotes/17 should return one quote, by id')
});

app.get("/quotes", function(request, response){
  response.json(quotes);
});

// /quotes/2
// /quotes?id=2
//GET
app.get("/quotes/:id", function(request, response) {
  const id = parseInt(request.params.id);
  // Sacar quote de quotes teniendo el id
  const quote = quotes.find(q => q.id === id);
  return response.send(quote);
});

//POST
app.post("/quotes", function(request, response) {
  const quote = {
    author: request.body.author,
    quote: request.body.quote,
    id: quotes.length
  };
  quotes.push(quote);
  return response.send(quote);
});

//PUT
app.put("/quotes/:id", function (request, response) {
  //1. Buscar en quotes una quote que tenga una id === request.params.id
  //2. Modificar valores de author y quote
  //3. Devolver el objeto modificado con author, quote, id
  const id = parseInt(request.params.id);
  const quote = quotes.find(quote => quote.id == id);
  quote.author = request.body.author;
  quote.quote = request.body.quote;
  return response.send(quote)
});

//DELETE
app.put("/quotes/:id", function (request, response) {
  const id = parseInt(request.params.id);
  const quote = quotes.findIndex(quote => quote.id == id);
  quotes.splice(index, 1);
  return response.send({id: id});
});

app.listen(3000, () => console.log("Listening on port 3000"));
