import request from 'supertest';
import '@babel/polyfill';
import app from './server';



describe('App', () => {
  let notes
  beforeEach(() => {
    notes = [
      {
      id: 1, title: 'take out'
    }
  ]
  })
})