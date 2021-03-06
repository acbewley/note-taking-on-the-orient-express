const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8080;

let notes;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, 'db.json')));

app.post('/api/notes', (req, res) => {
    const newNote = req.body
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) console.error(err)
        notes = JSON.parse(data);
        notes.push(newNote)
        fs.writeFile('db.json', JSON.stringify(notes), (err) => {
            if (err) throw err;
            console.log('wrote new note!')
        })
    });
})

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));