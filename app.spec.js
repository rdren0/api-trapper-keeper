const request = require('supertest')
import '@babel/polyfill';
const app = require('./app')

describe('App', () => {

  describe('GET ap1/v1/notes', () => {
    let notes
    beforeEach(() => {
      notes = [
        {
          id: 1,
          title: "TODO",
          tasks: [
            {
              id: 1,
              message: "Project"
            }]
          }]
        })
        
      })
      it('should return a status of 200', async () => {
        const response = await request(app).get('/api/v1/notes')
        expect(response.statusCode).toBe(200)
      })
})