const express = require("express");
const app = express();

import cors from "cors";
app.use(cors());
const ids = require("shortid");
app.set("port", process.env.PORT || 3000);

app.use(express.json());

app.locals.notes = [{
  id: ids.generate(),
  title: "TODO",
  listItems: [
    {
      id: ids.generate(),
      message: "Project"
    },
    {
      id: ids.generate(),
      message: "Mock Interview"
    }
  ]
}];

app.get("/api/notes", (request, response) => {
  const notes = app.locals.notes;
  return response.status(200).json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;

  app.locals.notes.find(note => {
    if (note.id === id) {
      return response.status(200).json(note);
    } else {
      return response.status(404).json("Not Found");
    }
  });
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

app.put("/api/notes", (req, res) => {
  const { title, items } = req.body;
  let { id } = req.params;
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
    return res.status(422).json("Please provide a title and at least one item");
  if (!noteWasFound) return res.status(404).json("Note not found");

  app.locals.notes = newNotes;
  return res.sendStatus(204);
});

const sendMessage = (response, code, message) => {
  return response.status(code).json(message);
};

app.delete("/api/v1/notes/:id", (request, response) => {
  const noteIndex = app.locals.notes.findIndex(
    note => note.id == request.params.id
  );

  if (noteIndex === -1) return response.status(404).json("Note not found");
  app.locals.notes.splice(noteIndex, 1);
  return sendMessage(response, 200, "Note was successfully deleted");
});

export default app;
