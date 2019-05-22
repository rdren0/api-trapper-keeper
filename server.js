
const express = require('express')
const app = express()
// let ids = require('short-id')
app.set('port', process.env.PORT || 3000)

// ids.generate();  // "aeaf15"

app.use(express.json())

app.locals.notes = [{name: 'test'}]

app.get('/api/notes', (request, response) => {
  const notes = app.locals.notes
  return response.status(200).json(notes)
})  

app.put('/api/notes', (req, res) => {
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

  if (!title || !items) return res.status(422).json('Please provide a title and at least one item');
  if (!noteWasFound) return res.status(404).json('Note not found');

  app.locals.notes = newNotes;
  return res.sendStatus(204);
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.notes} is running on http://localhost:${app.get('port')}.`);
});

const sendMessage = (response, code, message) => {
  return response.status(code).json(message)
 }

app.delete('/api/v1/notes/:id', (request, response) => {
  const noteIndex = app.locals.notes.findIndex(note => note.id == request.params.id);
  if (noteIndex === -1) return response.status(404).json('Note not found');
  app.locals.notes.splice(noteIndex, 1);
  return sendMessage(response, 200, 'Note was successfully deleted');
})