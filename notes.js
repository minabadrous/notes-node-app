const chalk = require("chalk");
const fs = require("fs");

const danger = (text) => chalk.red.inverse(text);
const success = (text) => chalk.green.inverse(text);

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", notesJSON);
};

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (duplicateNote) {
        console.log(danger("note title taken!"));
    } else {
        const updatednotes = [
            ...notes,
            {
                title: title,
                body: body,
            },
        ];

        saveNotes(updatednotes);
        console.log(success("note Added."));
    }
};

const removeNote = (title) => {
    const notes = loadNotes();

    const updatedNotes = notes.filter((note) => note.title !== title);
    if (notes.length === updatedNotes.length) {
        console.log(danger("note not found"));
    } else {
        saveNotes(updatedNotes);
        console.log(success("note deleted."));
    }
};

const listNotes = () => {
    const notes = loadNotes();

    console.log("\n");
    console.log(chalk.green.inverse("Your notes:"));
    notes.forEach(({ title, body }) => {
        console.log(chalk.blue(title));
        console.log(body);
    });
};

const readNote = (title) => {
    const notes = loadNotes();
    const noteFound = notes.find((note) => note.title === title);

    if (noteFound) {
        console.log(chalk.blue(title));
        console.log(noteFound.body);
    } else {
        console.log(danger("note not found"));
    }
};

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
};
