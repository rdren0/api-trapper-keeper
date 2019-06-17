// Import for generating unique 6 character IDs
const ids = require("shortid");


// "Cross-Origin Resource Sharing" allows the use
// of additional HTTP headers to tell a browser to let a web
// application access resources from a server at a different origin.
const cors = require("cors");
app.use(cors());


// Set-up for using express with node
const express = require("express");
const app = express();
app.use(express.json());


// Tells the server which port to run on
app.set("port", process.env.PORT || 3000);


// Our mock server of an empty array of notes
app.locals.notes = [];


// Takes in a request for all notes and returns a response
// with all the notes and a status code of 200
app.get("/api/v1/notes", (request, response) => {
  const notes = app.locals.notes;
  return response.status(200).json(notes);
});


// Takes in a request of an ID
app.get("/api/v1/notes/:id", (request, response) => {
  const { id } = request.params;
  const notes = app.locals.notes;
  // Attempts to find the note by ID in the this.locals.notes array
  const note = notes.find(note => note.id == id);
  // When unsuccessful (note is not in the locals array) it returns a status of 404 and an error message
  if (!note) return response.status(404).json({ Error: `No note found with ${id}` });
  // when successful returns a response with a status code of 200 when successful with a response of the note
  return response.status(200).json(note);
});


// Takes in a request of a newNote
app.post("/api/v1/notes/", (request, response) => {
  // deconstructs locals into notes
  const { notes } = app.locals;
  // Deconstructs the request into a title and list
  const { title, list } = request.body;
  // If either the title or list was not provided
  if (!title || !list)
  // returns a response of 422 and an error message
    return response.status(422).json({ Error: "Must have a title and list items" });
  const newlist = {
    id: ids.generate(),
    title,
    list
  };
  // If both title and list exists, pushed the newlist into the notes array
  notes.push(newlist);
  // returns a status of 201 and the individual note that was posted
  return response.status(201).json(newlist);
});


// Takes in a request of a note
app.put("/api/v1/notes/:id", (request, response) => {
  // Deconstructs the request body into a title and list
  const { title, notes } = request.body;
  //  Deconstructs the request params into just an ID
  let { id } = request.params;
  //Attempts to search for ID in the app.locals array
  const foundNote = app.locals.notes.find(note => note.id == id);
  // If the ID does not exist will return a status of 404 and an error message
  if (!foundNote)
    return response.status(404).json({ Error: `No note found with ${id} ` });
  // If the request did not contain both a title and notes it returns a status of 422 and error message
  if (!title || !notes)
    return response
      .status(422)
      .json({
        Error: `Expected format: { title: <String>, list: <Stringarray> }`
      });
  foundNote.title = title;
  foundNote.list = notes;
  // If request was successful will return a status of 204 and the updated notes array
  return response.sendStatus(204).json(app.locals.notes);
});


// Takes in a request of a note
app.delete("/api/v1/notes/:id", (request, response) => {
  // Deconstructs the app.locals into 'notes'
  const { notes } = app.locals;
  // Deconstructs the  request params into ID
  const { id } = request.params;
  // Attempts to find the index of the note with the provided ID
  const noteIndex = notes.findIndex(note => note.id == id);
// If not note does not exist in the notes array will return a status 404 and error message
  if (noteIndex === -1)
    return response.status(404).json({ Error: `No note found with ${id}` });
// If the note does exist in the array it will splice the specific note out of the array
  notes.splice(noteIndex, 1);
// When request is successful will return a status 200 and a message
  return response.sendStatus(200).json("Note was successfully deleted");
});

module.exports = app;
