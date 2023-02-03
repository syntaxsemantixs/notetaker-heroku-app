const notes = require('express').Router();
const { readFromFile, readAndAppend, readAndRemove } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// Route to get the list of notes
notes.get('/', (req, res) =>
{
  readFromFile('db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Route to create new notes and add them to the json list
notes.post('/', (req, res) =>
{
  const { title, text } = req.body;

  if (title && text)
  {
    // Add uuid here
    const newNote = { title, text, id: uuid() };

    // Helper tool fsUtil
    readAndAppend(newNote, 'db/db.json');

    // Respond with 201 for successful creation
    response = { status: 'great success', data: req.body };
    res.status(201).json(response);
  } else
  {
    res.status(400).json('Bad request');
  }
});

// Route to delete notes using query params to specify based on uuid
notes.delete('/:id', (req, res) =>
{
  const requestedID = req.params.id;

  // Filter notes based on uuid and remove from list
  if (requestedID)
  {
    readAndRemove(requestedID, 'db/db.json');

    response = { status: 'Successfully Deleted' }
    res.status(201).json(response);
  } else
  {
    res.status(400).json('Bad request');
  }
});

module.exports = notes;