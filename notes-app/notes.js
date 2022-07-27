const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  //find returns the first match and since there can be at max 1 duplicate this is more efficient than filering through all notes
  const duplicatesNote = notes.find((note) => note.title === title);

  if (!duplicatesNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added"));
  } else {
    console.log(chalk.red.inverse("Note title Taken!"));
  }
};

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

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  if (notesToKeep.length === notes.length) {
    console.log(chalk.red.inverse("No such note exists"));
  } else {
    saveNotes(notesToKeep);
    console.log(chalk.green.inverse("Note deleted"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const findNote = notes.find((note) => note.title === title);
  if (findNote) {
    console.log("Title", chalk.bgMagenta(findNote.title));
    console.log("Body", findNote.body);
  } else {
    console.log(chalk.bgRed("No such note found"));
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
