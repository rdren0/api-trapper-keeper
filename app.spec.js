const request = require('supertest')
import '@babel/polyfill';
const app = require('./app')

describe('App', () => {
  let notes
  beforeEach(() => {
    notes = [
      {
        id: 1,
        title: "TODO",
        tasks: [
          {
            id: 1,
            text: "testing"
          }]
        },
        {
          id: 2,
          title: "MORE",
          tasks: [
            {
              id: 3,
              text: "testing also"
            },{
              id: 4,
              text: "testing also again"
            }]
          }]
      })

      describe('GET /api/v1/notes', () => {
        it('should have a status of 200',  async () => {
          const response = await request(app).get('/api/v1/notes')
          expect(response.statusCode).toEqual(200)
        })
    
        it('should return an array of notes',  async () => {
          const response = await request(app).get('/api/v1/notes')
          expect(response.body).toEqual(notes)
        })
      })
    
      describe('GET /api/v1/notes/:id', () => {
        it('should return a status of 200',  async () => {
          const response = await request(app).get('/api/v1/notes/2')
          const expected = 200;
          expect(response.statusCode).toEqual(expected);
        })
        it('should return the correct note with id',  async () => {
          const response = await request(app).get('/api/v1/notes/2')
          const expected = app.locals.notes[1];
          expect(response.body).toEqual(expected);
        })
        it('should return an error message',  async () => {
          const response = await request(app).get('/api/v1/notes/7')
          const expected = "Pet not found";
          expect(response.body).toEqual(expected);
        })
        it('should return a status of 404 when pet not found',  async () => {
          const response = await request(app).get('/api/v1/notes/7')
          const expected = 404;
          expect(response.statusCode).toEqual(expected);
        })
      })
    
      describe('POST /api/v1/notes', () => {
        let newNote;
        let brokenNote;
        beforeEach(() => {
          newNote = { title: "Cleaning", list: [{id: 1, text: "testing"},{id:3, text:"testing again"}] }
          brokenNote = {title: "broken"}
        })
        it('should return a status of 201 & newNote', async () => {
          Date.now = jest.fn().mockImplementation(() => 10);
          expect(app.locals.notes.length).toBe(2)
          const response = await request(app).post('/api/v1/notes').send(newNote)
          expect(response.status).toBe(201);
          expect(response.body).toEqual({id:10, ...newNote})
          expect(app.locals.notes.length).toBe(3)
        })
        it('should return 422 and error message',  async () => {
          const response = await request(app).post('/api/v1/notes').send(brokenNote)
          expect(response.status).toBe(422)
          expect(response.body).toBe("Please provide a name and a type")
          expect(app.locals.notes.length).toBe(2)
    
        })
      })
      describe('PUT /api/v1/notes', () => {

        let newNote;
        let updatedNote;
        beforeEach(() => {
          newNote = { title: "Cleaning", list: [{id: 1, text: "testing"},{id:3, text:"testing again"}] }
          updatedNote = {title: "broken"}
        })


        it('should update an existing note', () => {
        const response = await request(app).put('/api/v1/2').send(updatedNote)


        })
        it('should return a status 204 when successful', () => {

        })

        it('should return a status 404 if note does not exist', () => {

        })

        it('should return a status 422 if the correct params are not set', () => {

        })
      })

      describe('DELETE /api/v1/notes', () => {
        it('should delete the correct note', () => {

        })
        it('return a status of 204 when complete', () => {

        })

        it('should return a status of 404 if note doesnt exist', () => {

        })
      })
})