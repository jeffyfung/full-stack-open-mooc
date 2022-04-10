const express = require('express');
const app = express();
require('dotenv').config();

app.listen(process.env.PORT || 3001, () => {
  console.log('Server is started on 127.0.0.1:'+ (process.env.PORT || 3001))
})

app.use(express.json());

const persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

app.get('/', (req, res) => {
  res.json({ content: 'hi'});
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
  let html = `<p>Phonebook has info for ${persons.length} people</p>`
    + `<p>${new Date()}</p>`;
  res.send(html);
});

app.get('/api/persons/:id', (req, res) => {
  console.log(req.headers);
  let targetId = Number(req.params.id);
  let targetEntry = persons.find(p => p.id === targetId);
  if (targetEntry) {
    res.json(targetEntry);
  } else {
    res.status(404).end();
  }
});