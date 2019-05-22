
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



app.listen(app.get('port'), () => {
  console.log(`${app.locals.notes} is running on http://localhost:${app.get('port')}.`);
});