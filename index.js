const { request, response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

/*METODOS*/

/*first method*/
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

/*get all persons*/
app.get("/api/persons", (request, response) => {
  response.json(phonebook);
});

/*get some info*/
app.get("/info", (request, response) => {
  const date = new Date();
  const personsCount = Object.keys(phonebook).length;
  response.send(
    `  <div>
    <h2>Phonebook has info for ${personsCount} people</h2>
      <h2>${date}</h2>
    </div>`
  );
});

/*get specific person*/
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = phonebook.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

/*delete person by ID*/
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  phonebook = phonebook.filter((person) => person.id !== id);

  response.status(204).end();
});

/*post new person*/
const generateId = () => {
  const newId = Math.floor(Math.random() * 100000 + 1);
  return newId;
};
app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(body);

  if (!body.name) {
    return response.status(400).json({ error: "name missing" });
  }
  if (!body.number) {
    return response.status(400).json({ error: "number missing" });
  }
  const aMatch = phonebook.some((person) => {
    return person.name.toLowerCase() === body.name.toLowerCase();
  });
  if (aMatch) {
    return response.status(400).json({ error: "name already added" });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number || "unknown",
  };

  phonebook = phonebook.concat(person);

  response.json(phonebook);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
