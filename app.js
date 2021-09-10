const yargs = require("yargs");
const chalk = require("chalk");
const notes = require("./notes");

const blued = (text) => chalk.bgBlue(text);

// Version
yargs.version("1.1.0");

// Add
yargs.command({
    command: "add",
    describe: "Add a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string",
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: "string",
        },
    },
    handler({ title, body }) {
        notes.addNote(title, body);
    },
});

// Remove
yargs.command({
    command: "remove",
    describe: "Remove a note",
    builder: {
        title: {
            describe: "note title to delete",
            demandOption: true,
            type: "strings",
        },
    },
    handler({ title }) {
        notes.removeNote(title);
    },
});

// List
yargs.command({
    command: "list",
    describe: "List the notes",
    handler() {
        notes.listNotes();
    },
});

// Read
yargs.command({
    command: "read",
    describe: "Read a note",
    builder: {
        title: {
            describe: "note title to read",
            demandOption: true,
            type: "string",
        },
    },
    handler({ title }) {
        notes.readNote(title);
    },
});

yargs.parse();
