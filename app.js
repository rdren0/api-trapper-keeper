const express = require("express");
const app = express();

import cors from "cors";
app.use(cors());
const ids = require("shortid");

app.use(express.json());

app.locals.notes = [];

app.get("/api/notes", (request, response) => {
  const notes = app.locals.notes;
  return response.status(200).json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const { id } = request.params
  const notes = app.locals.notes;

  const member = notes.find(member => member.id == id)
  if(!member) return response.status(404).json({Error: `No note found with ${id}`})
  return response.status(200).json(member)
});

//wait to pass this when current card is generated
app.post("/api/notes/", (request, response) => {

  const { notes } = app.locals;
  const { title, list } = request.body;

  if (!title || !list)
    return response
      .status(422)
      .send("Expected format: { title: <String>, list: <Stringarray> }");

  const newlist = {
    id: ids.generate(),
    ...request.body
  };

  notes.push(newlist);
  return response.status(201).json(newlist);
});

app.put("/api/notes", (reequest, response) => {
  const { title, items } = reequest.body;
  let { id } = reequest.params;
  id = parseInt(id);
  let noteWasFound = false;
  const newNote = app.locals.notes.map(note => {
    if (note.id === id) {
      noteWasFound = true;
      return { id, title, items };
    } else {
      return note;
    }
  });

  if (!title || !items)
    return response.status(422).json("Please provide a title and at least one item");
  if (!noteWasFound) return res.status(404).json("Note not found");

  app.locals.notes = newNotes;
  return response.sendStatus(204);
});

const sendMessage = (response, code, message) => {
  return response.status(code).json(message);
};

app.delete("/api/v1/notes/:id", (request, response) => {
  
  const noteIndex = app.locals.notes.findIndex(
    note => note.id == request.params.id
  );
  console.log('noteINde', noteIndex)
  if (noteIndex === -1) return response.status(404).json("Note not found");
  app.locals.notes.splice(noteIndex, 1);
  return sendMessage(response, 200, "Note was successfully deleted");
});

export default app;
