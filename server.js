const express = require("express");
const app = express();

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
app.post("quotes", function(request, response) {
  const quote = {
    author: request.body.author,
    quote: request.body.quote,
    id: quotes.length
  };
  quotes.push(quote);
  return response.send(quote);
});

app.listen(3000, () => console.log("Listening on port 3000"));
