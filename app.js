







const express = require('express')
const app = express()

import cors from 'cors';
app.use(cors());
const ids = require('shortid')

// ids.generate();  // "aeaf15"

app.use(express.json())

app.locals.notes = [{
  title: 'test',
  id: ids.generate(),
  list: 
  [{title: 'testtitle', id: ids.generate()}]
}]


app.get('/api/notes', (request, response) => {
  const notes = app.locals.notes
  return response.status(200).json(notes)
})  

app.get('/api/notes/:id', (request, response) => {
const { id } = request.params;

const note = app.locals.notes.forEach(note => {
    if(note.list.includes(id)) return response.status(200).json(note)})
    return response.status(404).json('Not Found')
})

//wait to pass this when current card is generated
app.post('/api/notes/:id', (request, response) => {
  const { list, title } = request.body
  const id = ids.generate()
})




export default app