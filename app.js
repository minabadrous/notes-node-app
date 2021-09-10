const yargs = require("yargs");
const notes = require("./notes");

// Version
yargs.version("1.1.0");

// ADD
const addCommand = {
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
};

// REMOVE
const removeCommand = {
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
};

// LIST
const listCommand = {
    command: "list",
    describe: "List the notes",
    handler() {
        notes.listNotes();
    },
};

// READ
const readCommand = {
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
};

// Group and yargs commands
const commands = [addCommand, removeCommand, listCommand, readCommand];
commands.forEach((command) => yargs.command({ ...command }));

// Init yargs
yargs.parse();
