
const express = require('express')
const app = express
app.use(express.json())

app.locals.notes = []