const fs = require("fs");
// const book = {
//   title: "Ego is the Enemy",
//   author: "Ryan Holiday",
// };

// const bookJSON = JSON.stringify(book);
//bookJSON.title will be undefined because it is no longer an object
//single quotes will be conveted to double quotes and propeties will be string type
// fs.writeFileSync("1-json.json", bookJSON);
// const dataBuffer = fs.readFileSync("1-json.json");
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);
// console.log(data.title);

const personbuffer = fs.readFileSync("1-json.json");
const personJSON = personbuffer.toString();
const person = JSON.parse(personJSON);
person.name = "Andrew";
person.age = 27;
const newPersonJSON = JSON.stringify(person);
fs.writeFileSync("1-json.json", newPersonJSON);
